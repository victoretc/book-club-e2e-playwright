import path from "node:path";
import {
	test as base,
	type ConsoleMessage,
	type TestInfo,
} from "@playwright/test";
import nunjucks from "nunjucks";

const CONSOLE_ERROR_EXCEPTIONS = [].map((pattern) => new RegExp(pattern, "i"));

function getAdditionalExceptions(testInfo: TestInfo): RegExp[] {
	const annotation = testInfo.annotations.find(
		(a) => a.type === "consoleErrorExceptions",
	);
	if (!annotation?.description) return [];

	try {
		const parsed = JSON.parse(annotation.description);
		return Array.isArray(parsed)
			? parsed.map((p: string) => new RegExp(p, "i"))
			: [];
	} catch {
		return [];
	}
}

function checkConsoleErrors(
	consoleMessages: ConsoleMessage[],
	testInfo: TestInfo,
): void {
	const errors = consoleMessages.filter(
		(msg) => msg.type().toLowerCase() === "error",
	);
	if (errors.length === 0) return;

	const additionalPatterns = getAdditionalExceptions(testInfo);

	for (const error of errors) {
		const isExpected = [
			...CONSOLE_ERROR_EXCEPTIONS,
			...additionalPatterns,
		].some((re) => re.test(error.text()));
		if (!isExpected) {
			throw new Error(
				`Обнаружена критическая ошибка в консоли браузера: ${error.text()}`,
			);
		}
	}
}

const nunjucksEnv = new nunjucks.Environment(
	new nunjucks.FileSystemLoader(path.join(__dirname, "templates")),
);

type LogEntry = {
	type: string;
	text: string;
	locationUrl: string;
	locationLineNumber: number | undefined;
	locationColumnNumber: number | undefined;
	pageUrl: string;
	argsCount: number;
};

function toLogEntry(msg: ConsoleMessage): LogEntry {
	const loc = msg.location();
	const page = msg.page();
	return {
		type: msg.type() ?? "unknown",
		text: msg.text(),
		locationUrl: loc?.url ?? "",
		locationLineNumber: loc?.lineNumber,
		locationColumnNumber: loc?.columnNumber,
		pageUrl: page?.url() ?? "",
		argsCount: msg.args()?.length ?? 0,
	};
}

function renderConsoleReport(messages: ConsoleMessage[]): string {
	const logs = messages.map(toLogEntry);

	const counts: Record<string, number> = {
		log: 0,
		error: 0,
		warning: 0,
		info: 0,
		debug: 0,
	};
	for (const msg of logs) {
		const t = msg.type.toLowerCase();
		if (t in counts) counts[t]++;
	}

	return nunjucksEnv.render("console_report.html", {
		logs,
		counts,
		total: logs.length,
		generation_time: new Date().toLocaleString("ru-RU", {
			timeZone: "Europe/Moscow",
		}),
	});
}

type ConsoleCaptureFixtures = {
	consoleCapture: undefined;
};

export const test = base.extend<ConsoleCaptureFixtures>({
	consoleCapture: [
		async ({ page }, use, testInfo) => {
			const messages: ConsoleMessage[] = [];
			const handler = (msg: ConsoleMessage) => messages.push(msg);

			page.on("console", handler);
			await use(undefined);
			page.removeListener("console", handler);

			await testInfo.attach("console_report", {
				body: renderConsoleReport(messages),
				contentType: "text/html",
			});

			checkConsoleErrors(messages, testInfo);
		},
		{ auto: true },
	],
});

export { expect } from "@playwright/test";
