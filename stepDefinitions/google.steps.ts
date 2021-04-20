import { Given, When, Then } from "@cucumber/cucumber";
import { assert } from "chai";
import selenium, { By, WebElement, Key } from "selenium-webdriver";

require("chromedriver");

let driver = new selenium.Builder().forBrowser("chrome").build();

Given(
    "the user has navigated to {string}",
    {timeout: 2 * 5000},
    async function (this: any, url: string) {
        await driver.get('https://www.google.com');
        await driver.findElement(By.name('q')).sendKeys('cheese', Key.ENTER);
    }
);

