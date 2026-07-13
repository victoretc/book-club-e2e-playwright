import type { PaginatedClubList } from "../../src/api/data-contracts";

export const GET_CLUBS = "/api/v1/clubs/";

export const ONE_CLUB_MOCK: PaginatedClubList = {
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

export const TWO_CLUBS_MOCK: PaginatedClubList = {
	count: 2,
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
		{
			id: 2,
			bookTitle: "The Name of the Wind",
			bookAuthors: "Patrick Rothfuss",
			publicationYear: 2007,
			description: "A fantasy novel about a legendary figure",
			telegramChatLink: "https://t.me/example2",
			owner: 2,
			members: [],
			reviews: [],
			created: "2024-01-02T00:00:00Z",
			modified: "2024-01-02T00:00:00Z",
		},
	],
};
