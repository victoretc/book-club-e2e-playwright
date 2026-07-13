import type { Page } from "@playwright/test";

export interface RouteConfig {
	url: string;
	method: string;
	body: object | null;
	status?: number;
}

export class Mock {
	constructor(private page: Page) {}

	async route(config: RouteConfig): Promise<void> {
		const { url, method, body, status } = config;
		const pattern = url.startsWith("http") ? url : `*/**${url}**`;
		await this.page.route(pattern, async (route) => {
			if (route.request().method() === method) {
				const response: Record<string, unknown> = { status: status ?? 200 };
				if (body !== null && body !== undefined) {
					response.json = body;
				}
				await route.fulfill(response);
			} else {
				await route.fallback();
			}
		});
	}
}
