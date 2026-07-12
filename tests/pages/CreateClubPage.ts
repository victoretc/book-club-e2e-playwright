import type { Page } from "@playwright/test";
import { expect, test } from "@playwright/test";

export class CreateClubPage {
	readonly heading = this.page.getByRole("heading", { name: "Создать клуб" });
	readonly bookTitleInput = this.page.getByPlaceholder("Компьютерные сети");
	readonly bookAuthorsInput = this.page.getByPlaceholder(
		"Дэвид Уэзеролл и Эндрю Таненбаум",
	);
	readonly publicationYearInput = this.page.getByPlaceholder("2012");
	readonly descriptionInput = this.page.getByPlaceholder("Описание книги");
	readonly telegramChatLinkInput =
		this.page.getByPlaceholder("https://t.me/...");
	readonly submitButton = this.page.getByRole("button", {
		name: "Создать клуб",
	});
	readonly cancelButton = this.page.getByRole("button", { name: "Отмена" });

	constructor(public readonly page: Page) {}

	async open() {
		await this.page.goto("/clubs/create");
	}

	async expectVisible() {
		await test.step("Проверить отображение формы создания клуба", async () => {
			await expect(this.heading).toBeVisible();
		});
	}

	async fillForm(data: {
		bookTitle: string;
		bookAuthors: string;
		publicationYear: number;
		description: string;
		telegramChatLink: string;
	}) {
		await test.step("Заполнить форму создания клуба", async () => {
			await this.bookTitleInput.fill(data.bookTitle);
			await this.bookAuthorsInput.fill(data.bookAuthors);
			await this.publicationYearInput.fill(String(data.publicationYear));
			await this.descriptionInput.fill(data.description);
			await this.telegramChatLinkInput.fill(data.telegramChatLink);
		});
	}

	async submit() {
		await test.step("Нажать Создать клуб", async () => {
			await this.submitButton.click();
		});
	}

	async cancel() {
		await test.step("Нажать Отмена", async () => {
			await this.cancelButton.click();
		});
	}

	async expectValidationErrors() {
		await test.step("Проверить ошибки валидации", async () => {
			await expect(
				this.page.getByText("Название книги обязательно"),
			).toBeVisible();
			await expect(
				this.page.getByText("Автор(ы) книги обязательно"),
			).toBeVisible();
			await expect(
				this.page.getByText("Год выпуска обязательно"),
			).toBeVisible();
			await expect(
				this.page.getByText("Описание книги обязательно"),
			).toBeVisible();
			await expect(
				this.page.getByText("Ссылка на Telegram чат обязательна"),
			).toBeVisible();
		});
	}

	async expectTelegramError() {
		await test.step("Проверить ошибку формата Telegram", async () => {
			await expect(
				this.page.getByText("Ссылка должна начинаться с https://t.me/"),
			).toBeVisible();
		});
	}
}
