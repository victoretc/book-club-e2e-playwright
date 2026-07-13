import { faker } from "@faker-js/faker";
import { expect } from "@playwright/test";
import {
	MockedclubsRetrieve,
	MockedclubsReviewsCreate,
	MockedclubsReviewsList,
} from "../generated/api/Clubs";
import { test } from "../fixtures/base";

test("Страница клуба — Отображение данных клуба", async ({
	authorizedUser,
	mock,
	clubDetailPage,
}) => {
	const clubData = {
		id: 42,
		bookTitle: "Война и мир",
		bookAuthors: "Л.Н. Толстой",
		publicationYear: 1869,
		description: "Роман-эпопея о русском обществе",
		telegramChatLink: "https://t.me/war_and_peace",
		owner: 1,
		members: [
			{ id: 1, username: "alice" },
			{ id: 2, username: "bob" },
		],
		reviews: [],
		created: "2024-01-01T00:00:00Z",
		modified: null,
	};

	await mock.route(MockedclubsRetrieve(42, clubData));

	await clubDetailPage.open(42);
	await clubDetailPage.expectClubInfo({
		title: clubData.bookTitle,
		author: clubData.bookAuthors,
		year: clubData.publicationYear,
		description: clubData.description,
	});
	await clubDetailPage.expectStats(2, 0);
	await clubDetailPage.expectTelegramLink();
});

test("Страница клуба — Бэк не отвечает", async ({
	authorizedUser,
	mock,
	clubDetailPage,
	page,
}) => {
	test.info().annotations.push({
		type: "consoleErrorExceptions",
		description: JSON.stringify(["Error fetching club: Response"]),
	});
	await mock.route(MockedclubsRetrieve(42, null, 500));

	await clubDetailPage.open(42);
	await expect(
		page.getByText("Не удалось загрузить информацию о клубе"),
	).toBeVisible();
});

test("Страница клуба — Заглушка при пустом списке отзывов", async ({
	authorizedUser,
	mock,
	clubDetailPage,
}) => {
	const clubData = {
		id: 43,
		bookTitle: "Преступление и наказание",
		bookAuthors: "Ф.М. Достоевский",
		publicationYear: 1866,
		description: "Роман о моральных дилеммах",
		telegramChatLink: "https://t.me/crime_and_punishment",
		owner: 1,
		members: [{ id: 1, username: "alice" }],
		reviews: [],
		created: "2024-01-01T00:00:00Z",
		modified: null,
	};

	await mock.route(MockedclubsRetrieve(43, clubData));

	await clubDetailPage.open(43);
	await clubDetailPage.expectNoReviews();
	await clubDetailPage.expectEmptyReviews();
});

test("Страница клуба — Отображение списка отзывов", async ({
	authorizedUser,
	mock,
	clubDetailPage,
}) => {
	const clubData = {
		id: 44,
		bookTitle: "Мастер и Маргарита",
		bookAuthors: "М.А. Булгаков",
		publicationYear: 1967,
		description: "Роман о добре и зле",
		telegramChatLink: "https://t.me/master_and_margarita",
		owner: 1,
		members: [
			{ id: 1, username: "alice" },
			{ id: 2, username: "bob" },
			{ id: 3, username: "charlie" },
		],
		reviews: [
			{
				id: 10,
				club: 44,
				user: { id: 2, username: "bob" },
				review: "Великолепная книга!",
				assessment: 5,
				readPages: 480,
				created: "2024-06-15T10:00:00Z",
				modified: null,
			},
			{
				id: 11,
				club: 44,
				user: { id: 3, username: "charlie" },
				review: "Интересный сюжет, но сложный язык",
				assessment: 4,
				readPages: 350,
				created: "2024-07-01T14:30:00Z",
				modified: null,
			},
		],
		created: "2024-01-01T00:00:00Z",
		modified: null,
	};

	await mock.route(MockedclubsRetrieve(44, clubData));
	await mock.route(
		MockedclubsReviewsList({
			count: 2,
			results: clubData.reviews,
		}),
	);

	await clubDetailPage.open(44);
	await clubDetailPage.expectStats(3, 2);
	await clubDetailPage.expectReviewVisible({
		username: "bob",
		rating: 5,
		pages: 480,
		text: "Великолепная книга!",
	});
	await clubDetailPage.expectReviewVisible({
		username: "charlie",
		rating: 4,
		pages: 350,
		text: "Интересный сюжет, но сложный язык",
	});
});

test("Страница клуба — Публикация отзыва", async ({
	authorizedUser,
	mock,
	clubDetailPage,
}) => {
	test.info().annotations.push({
		type: "consoleErrorExceptions",
		description: JSON.stringify([
			"Failed to load resource: the server responded with a status of 400",
		]),
	});

	const clubData = {
		id: 45,
		bookTitle: "1984",
		bookAuthors: "Джордж Оруэлл",
		publicationYear: 1949,
		description: "Антиутопия о тоталитарном обществе",
		telegramChatLink: "https://t.me/orwell_1984",
		owner: 999,
		members: [
			{ id: 999, username: "owner" },
			{ id: authorizedUser.id, username: authorizedUser.email },
		],
		reviews: [],
		created: "2024-01-01T00:00:00Z",
		modified: null,
	};

	await mock.route(MockedclubsRetrieve(45, clubData));
	await mock.route(
		MockedclubsReviewsCreate({
			id: 100,
			club: 45,
			user: { id: authorizedUser.id, username: authorizedUser.email },
			review: "Шедевр антиутопии",
			assessment: 5,
			readPages: 328,
			created: "2024-07-13T00:00:00Z",
			modified: null,
		}),
	);

	await clubDetailPage.open(45);
	await clubDetailPage.expectWriteReviewButton();

	await clubDetailPage.openReviewForm();
	await clubDetailPage.expectReviewFormVisible();

	await clubDetailPage.fillReviewForm({
		rating: 5,
		pages: 328,
		text: "Шедевр антиутопии",
	});
	await clubDetailPage.publishReview();
	await clubDetailPage.expectReviewFormHidden();
});

test("Страница клуба — Отмена отзыва", async ({
	authorizedUser,
	mock,
	clubDetailPage,
}) => {
	const clubData = {
		id: 46,
		bookTitle: "Мастер и Маргарита",
		bookAuthors: "М.А. Булгаков",
		publicationYear: 1967,
		description: "Роман о добре и зле",
		telegramChatLink: "https://t.me/master_and_margarita",
		owner: 999,
		members: [
			{ id: 999, username: "owner" },
			{ id: authorizedUser.id, username: authorizedUser.email },
		],
		reviews: [],
		created: "2024-01-01T00:00:00Z",
		modified: null,
	};

	await mock.route(MockedclubsRetrieve(46, clubData));

	await clubDetailPage.open(46);
	await clubDetailPage.openReviewForm();
	await clubDetailPage.expectReviewFormVisible();

	await clubDetailPage.cancelReview();
	await clubDetailPage.expectReviewFormHidden();
});

test("Страница клуба — Создать клуб и открыть его страницу", async ({
	authorizedUser,
	createClubPage,
	clubDetailPage,
	dashboardPage,
	page,
}) => {
	const bookTitle = faker.book.title();

	await createClubPage.open();
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

	await dashboardPage.clubCard(bookTitle).click();
	await expect(page).toHaveURL(/\/clubs\/\d+/);
	await clubDetailPage.expectEditButton();
});
