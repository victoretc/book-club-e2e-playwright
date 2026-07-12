import { faker } from "@faker-js/faker";
import { expect, test } from "../fixtures/base";

test("Создать клуб", async ({ createClubPage, dashboardPage }) => {
	const bookTitle = faker.book.title();

	await createClubPage.expectVisible();

	await createClubPage.fillForm({
		bookTitle,
		bookAuthors: faker.person.fullName(),
		publicationYear: faker.number.int({ min: 1900, max: 2025 }),
		description: faker.lorem.sentence(),
		telegramChatLink: `https://t.me/${faker.internet.username()}`,
	});
	await createClubPage.submit();

	await dashboardPage.searchClub(bookTitle);
	await dashboardPage.expectClubVisible(bookTitle);
});

test("Создать клуб - Пустая форма", async ({ createClubPage }) => {
	await createClubPage.expectVisible();
	await createClubPage.submit();
	await createClubPage.expectValidationErrors();
});

test.describe("Создать клуб — Невалидный Telegram", () => {
	const invalidLinks = [
		"not-a-valid-url",
		"https://google.com",
		"t.me/abc",
		"@something",
	];

	invalidLinks.forEach((link) => {
		test(`"${link}"`, async ({ createClubPage }) => {
			await createClubPage.expectVisible();

			await createClubPage.fillForm({
				bookTitle: faker.book.title(),
				bookAuthors: faker.person.fullName(),
				publicationYear: faker.number.int({ min: 1900, max: 2025 }),
				description: faker.lorem.sentence(),
				telegramChatLink: link,
			});
			await createClubPage.submit();
			await createClubPage.expectTelegramError();
		});
	});
});

test("Создать клуб — Отмена", async ({ createClubPage, page }) => {
	await createClubPage.expectVisible();
	await createClubPage.cancel();
	await expect(page).toHaveURL(/\/$/);
});
