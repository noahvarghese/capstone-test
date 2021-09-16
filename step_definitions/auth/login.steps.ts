import { Given, Then, When } from "@cucumber/cucumber";
import User, { UserAttributes } from "../../models/user/user";
import BaseWorld from "../../support/base_world";
import { createModel } from "../../util/model_actions";
import { By } from "selenium-webdriver";
import { expect, assert } from "chai";
import { client } from "../../util/permalink";
import { submitForm } from "../../util/ui_actions";

Given("the user has valid credentials", async function (this: BaseWorld) {
    await createModel.call(this, User, "user");
    this.getDriver().get(client);
});

When(
    "the user submits their credentials",
    { timeout: 10000 },
    async function (this: BaseWorld) {
        const user = this.getCustomProp<UserAttributes>("userAttributes");
        const driver = this.getDriver();

        await submitForm.call(this, {
            email: user.email,
            password: user.password,
        });

        await driver.sleep(3000);
    }
);

Then(
    "the user should be redirected to the dashboard",
    async function (this: BaseWorld) {
        const driver = this.getDriver();

        const header = await driver.findElement(By.css("h1"));
        assert.isOk(header);
        assert.equal(await header.getText(), "Home");
    }
);
