import { test } from "../fixtures/base";
import { GET_CLUBS, ONE_CLUB_MOCK } from "./mocks/club-mocks";

test("Клубы", async ({ mock, dashboardPage }) => {
	await mock.route(GET_CLUBS, ONE_CLUB_MOCK);

	await dashboardPage.open();
	await dashboardPage.expectClubsCount(1);
	await dashboardPage.expectClubVisible("The Darkness That Comes Before");
});
