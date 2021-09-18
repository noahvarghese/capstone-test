import { Then, When } from "@cucumber/cucumber";
import { expect } from "chai";
import { By, WebElement } from "selenium-webdriver";
import BaseWorld from "../../support/base_world";

When("the user logs out", async function (this: BaseWorld) {
    const driver = this.getDriver();

    const logoutBtn = await driver.findElement(By.linkText("LOGOUT"));
    logoutBtn.click();

    await driver.sleep(2000);
});

Then(
    "the user should be redirected to the login page",
    async function (this: BaseWorld) {
        const driver = this.getDriver();

        const header = await driver.executeScript<WebElement | undefined>(
            () => {
                const headers = Array.from(document.getElementsByTagName("h1"));

                if (headers.length > 0) return headers[0];
                else return undefined;
            }
        );

        // tslint:disable-next-line: no-unused-expression
        expect(header).to.not.be.undefined;
        expect(((await header?.getText()) ?? "").toLowerCase()).to.be.equal(
            "welcome onboard"
        );
    }
);
