import type { Page } from "@playwright/test";

export class Mock {
	constructor(private page: Page) {}

	public async route(url: string, body: object) {
		const pattern = url.startsWith("http") ? url : `*/**${url}**`;
		await this.page.route(pattern, async (route) => {
			await route.fulfill({
				json: body,
				status: 200,
			});
		});
	}
}
