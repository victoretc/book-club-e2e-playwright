import { faker } from "@faker-js/faker";
import { expect, test } from "../fixtures/base";

test("Авторизация", async ({
	signInPage,
	registeredUser,
	authCode,
	profilePage,
	page
}) => {
	await signInPage.open();
	await signInPage.fillEmail(registeredUser.email);
	await signInPage.requestCode();
	await signInPage.expectCodeStep();
	const code = await authCode.retrieve(registeredUser.email);
	await signInPage.fillCode(code);
	await signInPage.verifyCode();
	await expect(page).toHaveURL("/");
	await profilePage.open();
	await profilePage.expectEmail(registeredUser.email);
});

test("Авторизация — неверный код", async ({ signInPage }) => {
	test.info().annotations.push({
		type: "consoleErrorExceptions",
		description: JSON.stringify([
			"Failed to load resource: the server responded with a status of 400",
		]),
	});
	const email = faker.internet.email();
	await signInPage.open();
	await signInPage.fillEmail(email);
	await signInPage.requestCode();
	await signInPage.fillCode("0000");
	await signInPage.verifyCode();
	await signInPage.expectInvalidCodeError();
	await signInPage.expectCodeStep();
});

test("Авторизация — кнопка «Назад» возвращает к вводу email", async ({
	signInPage,
}) => {
	const email = faker.internet.email();
	await signInPage.open();
	await signInPage.fillEmail(email);
	await signInPage.requestCode();
	await signInPage.expectCodeStep();
	await signInPage.goBack();
	await signInPage.expectEmailStep();
	await signInPage.expectEmailPreserved(email);
});

test("Регистрация", async ({
	signInPage,
	authCode,
	profilePage,
	page
}) => {
	const email = faker.internet.email();
	await signInPage.open();
	await signInPage.fillEmail(email);
	await signInPage.requestCode();
	await signInPage.expectCodeStep();
	const code = await authCode.retrieve(email);
	await signInPage.fillCode(code);
	await signInPage.verifyCode();
	await expect(page).toHaveURL("/");
	await profilePage.open();
	await profilePage.expectEmail(email);
});
