import type { Page } from "@playwright/test";
import { expect, test } from "@playwright/test";

export class SignInPage {
	readonly emailInput = this.page.getByTestId("email-input");
	readonly submitButton = this.page.getByTestId("submit-button");
	readonly codeInput = this.page.getByTestId("code-input");
	readonly verifyButton = this.page.getByTestId("verify-button");
	readonly backButton = this.page.getByRole("button", { name: "Назад" });
	readonly invalidCodeError = this.page.getByText("Неверный код подтверждения");

	constructor(public readonly page: Page) {}

	async open() {
		await this.page.goto("/signin");
	}

	async expectEmailStep() {
		await test.step("Проверить отображение шага ввода email", async () => {
			await expect(this.emailInput).toBeVisible();
			await expect(this.submitButton).toBeVisible();
		});
	}

	async expectCodeStep() {
		await test.step("Проверить отображение шага ввода кода", async () => {
			await expect(this.codeInput).toBeVisible();
			await expect(this.verifyButton).toBeVisible();
		});
	}

	async fillEmail(email: string) {
		await test.step(`Ввести "${email}" в поле "Электропочта"`, async () => {
			await this.emailInput.fill(email);
		});
	}

	async requestCode() {
		await test.step('Нажать "Получить код"', async () => {
			await this.submitButton.click();
		});
	}

	async fillCode(code: string) {
		await test.step("Ввести код подтверждения", async () => {
			await this.codeInput.fill(code);
		});
	}

	async verifyCode() {
		await test.step('Нажать "Подтвердить"', async () => {
			await this.verifyButton.click();
		});
	}

	async goBack() {
		await test.step('Нажать "Назад"', async () => {
			await this.backButton.click();
		});
	}

	async expectInvalidCodeError() {
		await test.step('Проверить ошибку "Неверный код подтверждения"', async () => {
			await expect(this.invalidCodeError).toBeVisible();
		});
	}

	async expectEmailPreserved(email: string) {
		await test.step(`Проверить что email "${email}" сохранён`, async () => {
			await expect(this.emailInput).toHaveValue(email);
		});
	}
}
