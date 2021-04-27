import { Given, When, Then } from "@cucumber/cucumber";
import { assert } from "chai";
import {
    By,
    WebElement,
    Key,
    ThenableWebDriver,
    WebDriver,
} from "selenium-webdriver";

Given(
    "the user has navigated to {string}",
    { timeout: 2 * 5000 },
    async function (this: any, url: string) {
        const driver: ThenableWebDriver | WebDriver = this.getDriver();
        await driver.get(url);
        assert.isTrue(true);
    }
);

When(
    "I search Google for {string}",
    async function (this: any, searchTerm: string) {
        const driver: ThenableWebDriver | WebDriver = this.getDriver();
        await driver.findElement(By.name("q")).sendKeys(searchTerm, Key.ENTER);
    }
);

Then(
    "I should see {string} in the result",
    async function (this: any, searchTerm: string) {
        const driver: ThenableWebDriver | WebDriver = this.getDriver();
        const els: WebElement[] = await driver.findElements({
            tagName: "h3",
        });

        let found = false;

        for (const el of els) {
            if (
                (await el.getText())
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase())
            ) {
                found = true;
                break;
            }
        }

        assert.isTrue(found);
    }
);
