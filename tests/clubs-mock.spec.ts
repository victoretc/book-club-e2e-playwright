import type { PaginatedClubList } from "../src/api/data-contracts";
import { MockedclubsList } from "../src/api/Clubs";
import { test } from "../fixtures/base";

const CLUBS_MOCK: PaginatedClubList = {
	count: 1,
	next: null,
	previous: null,
	results: [
		{
			id: 1,
			bookTitle: "The Darkness That Comes Before",
			bookAuthors: "Scott Bakker",
			publicationYear: 2003,
			description: "A dark fantasy novel about a philosopher-warrior",
			telegramChatLink: "https://t.me/example",
			owner: 1,
			members: [],
			reviews: [],
			created: "2024-01-01T00:00:00Z",
			modified: "2024-01-01T00:00:00Z",
		},
	],
};

test("Клубы", async ({ mock, dashboardPage }) => {
	await mock.route(MockedclubsList(CLUBS_MOCK));

	await dashboardPage.open();
	await dashboardPage.expectClubsCount(1);
	await dashboardPage.expectClubVisible("The Darkness That Comes Before");
});
