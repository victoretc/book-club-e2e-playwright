import type { Locator, Page } from "@playwright/test";
import { expect, test } from "@playwright/test";

export class ClubDetailPage {
	readonly heading = this.page.getByTestId("club-details-book-title");
	readonly authorText = this.page.getByTestId("club-details-book-author");
	readonly descriptionText = this.page.getByTestId("club-details-description");
	readonly memberCount = this.page.getByTestId("club-details-members-count");
	readonly reviewCount = this.page.getByTestId("club-details-reviews-count");
	readonly telegramButton = this.page.getByTestId(
		"club-details-telegram-button",
	);
	readonly editButton = this.page.getByTestId("club-details-edit-button");
	readonly joinButton = this.page.getByRole("button", { name: "Вступить" });
	readonly writeReviewButton = this.page.getByTestId(
		"club-reviews-create-button",
	);
	readonly reviewHeading = this.page.getByTestId("club-reviews-title");
	readonly newReviewHeading = this.page.locator(
		'[data-testid="club-reviews-form"] h3',
	);
	readonly ratingInput = this.page.getByTestId("club-reviews-assessment-input");
	readonly readPagesInput = this.page.getByTestId("club-reviews-pages-input");
	readonly reviewTextInput = this.page.getByTestId("club-reviews-text-input");
	readonly publishButton = this.page.getByTestId("club-reviews-submit-button");
	readonly cancelReviewButton = this.page.getByTestId(
		"club-reviews-cancel-button",
	);

	constructor(public readonly page: Page) {}

	async open(id: number) {
		await this.page.goto(`/clubs/${id}`);
	}

	async expectClubInfo(data: {
		title: string;
		author: string;
		year: number;
		description: string;
	}) {
		await test.step("Проверить отображение информации о клубе", async () => {
			await expect(this.heading).toHaveText(data.title);
			await expect(
				this.page.getByTestId("club-details-publication-year"),
			).toHaveText(String(data.year));
			await expect(this.authorText).toHaveText(data.author);
			await expect(this.descriptionText).toHaveText(data.description);
		});
	}

	async expectStats(members: number, reviews: number) {
		await test.step("Проверить статистику клуба", async () => {
			await expect(this.memberCount).toContainText(String(members));
			await expect(this.reviewCount).toContainText(String(reviews));
		});
	}

	async expectTelegramLink() {
		await test.step("Проверить отображение кнопки Telegram", async () => {
			await expect(this.telegramButton).toBeVisible();
		});
	}

	async expectEditButton() {
		await test.step("Проверить отображение кнопки Редактировать", async () => {
			await expect(this.editButton).toBeVisible();
		});
	}

	async expectJoinButton() {
		await test.step("Проверить отображение кнопки Вступить", async () => {
			await expect(this.joinButton).toBeVisible();
		});
	}

	async expectWriteReviewButton() {
		await test.step("Проверить отображение кнопки Написать отзыв", async () => {
			await expect(this.writeReviewButton).toBeVisible();
		});
	}

	async expectReviewFormVisible() {
		await test.step("Проверить отображение формы отзыва", async () => {
			await expect(this.newReviewHeading).toBeVisible();
			await expect(this.ratingInput).toBeVisible();
			await expect(this.readPagesInput).toBeVisible();
			await expect(this.reviewTextInput).toBeVisible();
			await expect(this.publishButton).toBeVisible();
			await expect(this.cancelReviewButton).toBeVisible();
		});
	}

	async expectReviewFormHidden() {
		await test.step("Проверить скрытие формы отзыва", async () => {
			await expect(this.newReviewHeading).toBeHidden();
		});
	}

	async openReviewForm() {
		await test.step("Открыть форму отзыва", async () => {
			await this.writeReviewButton.click();
		});
	}

	async fillReviewForm(data: { rating: number; pages: number; text: string }) {
		await test.step("Заполнить форму отзыва", async () => {
			await this.ratingInput.fill(String(data.rating));
			await this.readPagesInput.fill(String(data.pages));
			await this.reviewTextInput.fill(data.text);
		});
	}

	async publishReview() {
		await test.step("Нажать Опубликовать", async () => {
			await this.publishButton.click();
		});
	}

	async cancelReview() {
		await test.step("Нажать Отмена", async () => {
			await this.cancelReviewButton.click();
		});
	}

	async expectReviewVisible(data: {
		username: string;
		rating: number;
		pages: number;
		text: string;
	}) {
		await test.step("Проверить отображение отзыва", async () => {
			const stars = "★".repeat(data.rating) + "☆".repeat(5 - data.rating);
			const card = this.page.locator(".review-card").filter({ hasText: data.username });
			await expect(card).toBeVisible();
			await expect(card.getByText(stars)).toBeVisible();
			await expect(card.getByText(`${data.pages} стр.`)).toBeVisible();
			await expect(card.getByText(data.text)).toBeVisible();
		});
	}

	async expectEmptyReviews() {
		await test.step("Проверить отображение заглушки при пустом списке отзывов", async () => {
			await expect(
				this.page.getByText("Пока нет отзывов. Будьте первым!"),
			).toBeVisible();
		});
	}

	async expectNoReviews() {
		await test.step("Проверить отсутствие отзывов", async () => {
			await expect(this.reviewCount).toHaveText("0");
		});
	}

	readonly reviewItem = (username: string): Locator =>
		this.page.getByText(username).first();
}
