import { Given, When, Then } from "@cucumber/cucumber";
import { assert } from "chai";
import { By, WebElement, Key } from "selenium-webdriver";
require("chromedriver");

Given(
    "the user has navigated to {string}",
    {timeout: 2 * 5000},
    async function (this: any, url: string) {
        await this.getDriver().get(url);
    }
);

When(
    "I search Google for {string}",
    async function(this: any, searchTerm: string) {
        await this.getDriver().findElement(By.name('q')).sendKeys(searchTerm, Key.ENTER);
    }
);

Then(
    "I should see {string} in the result",
    async function(this: any, searchTerm: string) {
        const els: WebElement[] = await this.getDriver().findElements({ tagName: "h3" });

        let found = false;

        for ( const el of els ) {
            if ( (await el.getText()).toLowerCase().includes(searchTerm.toLowerCase())) {
                found = true;
                break;
            }
        }

        assert.isTrue(found);
    }
)
