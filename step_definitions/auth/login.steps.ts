import { Given, Then, When } from "@cucumber/cucumber";
import User from "../../models/user/user";
import BaseWorld from "../../support/base_world";
import { createModel } from "../../util/actions/model_actions";
import { By } from "selenium-webdriver";
import { assert } from "chai";
import { login } from "../../util/actions/auth";

Given("the user has valid credentials", async function (this: BaseWorld) {
    await createModel.call(this, User, "user");
});

When(
    "the user submits their credentials",
    { timeout: 10000 },
    async function (this: BaseWorld) {
        await login.call(this);
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
