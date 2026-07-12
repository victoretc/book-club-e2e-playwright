import type { Locator, Page } from "@playwright/test";
import { expect, test } from "@playwright/test";

export class DashboardPage {
	readonly searchInput = this.page.getByPlaceholder("Найти книжный клуб");
	readonly searchButton = this.page.getByRole("button", { name: "Найти" });

	constructor(public readonly page: Page) {}

	readonly clubCard = (title: string): Locator =>
		this.page.getByRole("heading", { name: title });

	async searchClub(title: string) {
		await test.step("Найти клуб в поиске", async () => {
			await this.searchInput.fill(title);
			await this.searchButton.click();
		});
	}

	async expectClubVisible(title: string) {
		await test.step("Проверить отображение клуба", async () => {
			await expect(this.clubCard(title)).toBeVisible();
		});
	}
}
