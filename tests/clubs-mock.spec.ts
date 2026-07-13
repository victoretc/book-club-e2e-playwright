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
