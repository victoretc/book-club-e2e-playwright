import type { Page } from "@playwright/test";

export interface RouteConfig {
	url: string;
	method: string;
	body: object | null;
}

export class Mock {
	constructor(private page: Page) {}

	async route(config: RouteConfig): Promise<void> {
		const { url, method, body } = config;
		const pattern = url.startsWith("http") ? url : `*/**${url}**`;
		await this.page.route(pattern, async (route) => {
			if (route.request().method() === method) {
				await route.fulfill({ json: body ?? {}, status: 200 });
			} else {
				await route.fallback();
			}
		});
	}
}
