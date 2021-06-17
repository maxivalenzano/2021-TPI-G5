import { Given, When, Then } from '@cucumber/cucumber';

import AuthPage from '../pageobjects/auth.page';
import HomePage from '../pageobjects/home.page';

const pages = {
    auth: AuthPage
}

Given(/^I am on the (\w+) page$/, async (page) => {
    await pages[page].open()
});

When(/^I login with (\w+) and (.+)$/, async (username, password) => {
    await AuthPage.auth(username, password)
});

Then(/^I should see a title$/, async () => {
    expect(HomePage.title).toBeExisting();
});

