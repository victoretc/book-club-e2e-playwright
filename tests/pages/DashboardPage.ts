import type { Locator, Page } from "@playwright/test";
import { expect, test } from "@playwright/test";

export class DashboardPage {
	readonly searchInput = this.page.getByPlaceholder("Найти книжный клуб");
	readonly searchButton = this.page.getByRole("button", { name: "Найти" });
	readonly clubCards = this.page.getByRole("heading", { level: 3 });

	constructor(public readonly page: Page) {}

	async open() {
		await this.page.goto("/");
	}

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

	async expectClubsCount(count: number) {
		await test.step(`Проверить количество клубов: ${count}`, async () => {
			await expect(this.clubCards).toHaveCount(count);
		});
	}
}
