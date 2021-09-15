import { Given, Then, When } from "@cucumber/cucumber";
import User, { UserAttributes } from "../../models/user/user";
import BaseWorld from "../../support/base_world";
import { createModel } from "../../util/model_actions";
import { By } from "selenium-webdriver";
import { expect, assert } from "chai";
import { client } from "../../util/permalink";

Given("the user has valid credentials", async function (this: BaseWorld) {
    await createModel.call(this, User, "user");
    this.getDriver().get(client);
});

When("the user submits their credentials", async function (this: BaseWorld) {
    const user = this.getCustomProp<UserAttributes>("userAttributes");
    const driver = this.getDriver();

    const emailInput = await driver.findElement(By.id("email"));
    await emailInput.sendKeys(user.email);

    const passwordInput = await driver.findElement(By.id("password"));
    await passwordInput.sendKeys(user.password);

    const submitButton = await driver.findElement(
        By.css("button[type=submit]")
    );
    await submitButton.click();

    await driver.sleep(3000);
});

Then(
    "the user should be redirected to the dashboard",
    async function (this: BaseWorld) {
        const driver = this.getDriver();

        const header = await driver.findElement(By.css("h1"));
        assert.isOk(header);
    }
);
