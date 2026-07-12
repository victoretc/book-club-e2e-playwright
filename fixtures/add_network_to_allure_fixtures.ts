import path from "node:path";
import { test as base, type Response } from "@playwright/test";
import nunjucks from "nunjucks";

type KeyValue = { key: string; value: string };

type NetworkEntry = {
	url: string;
	method: string;
	status: number;
	resourceType: string;
	requestHeaders: KeyValue[] | null;
	requestBody: string | null;
	responseHeaders: KeyValue[] | null;
	responseBody: string | null;
};

function isJsonResponse(response: Response): boolean {
	return (
		response.status() >= 400 &&
		(response.headers()["content-type"] ?? "").includes("application/json")
	);
}

function toKeyValues(headers: Record<string, string>): KeyValue[] {
	return Object.entries(headers).map(([key, value]) => ({ key, value }));
}

function tryStringify(body: unknown): string | null {
	if (body == null) return null;
	if (typeof body === "string") return body;
	try {
		return JSON.stringify(body, null, 2);
	} catch {
		return null;
	}
}

function collectResponse(response: Response): NetworkEntry {
	const isJson = isJsonResponse(response);

	let requestHeaders: KeyValue[] | null = null;
	let requestBody: string | null = null;
	let responseHeaders: KeyValue[] | null = null;
	let responseBody: string | null = null;

	if (isJson) {
		requestHeaders = toKeyValues(response.request().headers());
		requestBody = tryStringify(response.request().postData());
		responseHeaders = toKeyValues(response.headers());
		try {
			responseBody = tryStringify(response.json());
		} catch {}
	}

	return {
		url: response.request().url(),
		method: response.request().method(),
		status: response.status(),
		resourceType: response.request().resourceType(),
		requestHeaders,
		requestBody,
		responseHeaders,
		responseBody,
	};
}

const nunjucksEnv = new nunjucks.Environment(
	new nunjucks.FileSystemLoader(path.join(__dirname, "templates")),
);

function renderNetworkReport(responses: NetworkEntry[]): string {
	const total = responses.length;
	const successCount = responses.filter(
		(r) => r.status >= 200 && r.status < 400,
	).length;
	const errorCount = responses.filter((r) => r.status >= 400).length;
	const pendingCount = responses.filter((r) => r.status === 0).length;

	return nunjucksEnv.render("network_report.html", {
		responses,
		total,
		success_count: successCount,
		error_count: errorCount,
		pending_count: pendingCount,
		generation_time: new Date().toLocaleString("ru-RU", {
			timeZone: "Europe/Moscow",
		}),
	});
}

type NetworkCaptureFixtures = {
	networkCapture: undefined;
};

export const test = base.extend<NetworkCaptureFixtures>({
	networkCapture: [
		async ({ page }, use, testInfo) => {
			const responses: NetworkEntry[] = [];
			const handler = (response: Response) =>
				responses.push(collectResponse(response));

			page.on("response", handler);
			await use(undefined);
			page.removeListener("response", handler);

			await testInfo.attach("network_report", {
				body: renderNetworkReport(responses),
				contentType: "text/html",
			});
		},
		{ auto: true },
	],
});

export { expect } from "@playwright/test";
