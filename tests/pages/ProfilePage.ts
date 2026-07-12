import type { Page } from "@playwright/test";
import { expect, test } from "@playwright/test";

export class ProfilePage {
	constructor(public readonly page: Page) {}

	async open() {
		await this.page.goto("/profile");
	}

	async expectEmail(email: string) {
		await test.step(`Проверить отображение email "${email}"`, async () => {
			await expect(this.page.getByText(email).first()).toBeVisible();
		});
	}
}
