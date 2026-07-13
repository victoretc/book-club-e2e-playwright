import { expect } from "@playwright/test";
import { MockedclubsList } from "../generated/api/Clubs";
import { test } from "../fixtures/base";

test("Клубы", async ({ mock, dashboardPage }) => {
	await mock.route(MockedclubsList());

	await dashboardPage.open();
	await dashboardPage.expectClubsCount(1);
	await dashboardPage.expectClubVisible(
		"0PkGqM1Dp2UtmFQLaDZdKbqdlWGbk0EYtBcdIKpOmsT1FmrseOQQ5f6A6igawDL3eS5rRlGYh9I4AJuKuTsB0R93AHsgRtW4fDYi8lRRnzkOumM2uX",
	);
});


test("Клубы - бэк не отвечает", async ({ mock, dashboardPage }) => {
	await mock.route(MockedclubsList(null, 500));
	await dashboardPage.open();
	await expect(
		dashboardPage.page.getByText("Не удалось загрузить список клубов"),
	).toBeVisible();
});
