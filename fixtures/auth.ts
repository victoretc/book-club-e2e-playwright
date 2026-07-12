import { faker } from "@faker-js/faker";
import { test as apiTest } from "./api";

type RegisteredUser = {
	id: number;
	email: string;
	username: string;
	access: string;
	refresh: string;
};

type AuthorizedUser = RegisteredUser;

type AuthCode = {
	retrieve: (email: string) => Promise<string>;
};

export const test = apiTest.extend<{
	registeredUser: RegisteredUser;
	authorizedUser: AuthorizedUser;
	authCode: AuthCode;
}>({
	registeredUser: async ({ api }, use) => {
		const email = faker.internet.email();
		const username = email;

		await api.auth.authCodeCreate({ email });

		const { code } = await api.auth.authCodeRetrieveCreate({ email });
		const { access, refresh } = await api.auth.authCodeVerifyCreate({
			email,
			code,
		});

		const { id } = await api.users.usersMeRetrieve({
			headers: { Authorization: `Bearer ${access}` },
		});

		const user = { id, email, username, access, refresh };
		await use(user);

		await api.users.usersMeDestroy({
			headers: { Authorization: `Bearer ${access}` },
		});
	},
	authorizedUser: async ({ registeredUser, page }, use) => {
		await page.addInitScript(
			({ id, email, access, refresh }) => {
				localStorage.setItem(
					"book_club_auth",
					JSON.stringify({
						user: {
							id,
							username: email,
							firstName: "",
							lastName: "",
							email,
						},
						accessToken: access,
						refreshToken: refresh,
					}),
				);
			},
			{
				id: registeredUser.id,
				email: registeredUser.email,
				access: registeredUser.access,
				refresh: registeredUser.refresh,
			},
		);
		await use(registeredUser);
	},
	authCode: async ({ api }, use) => {
		await use({
			retrieve: async (email: string) => {
				const { code } = await api.auth.authCodeRetrieveCreate({ email });
				return code;
			},
		});
	},
});
