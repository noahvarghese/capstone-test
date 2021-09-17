import { Given, When, Then, After } from "@cucumber/cucumber";
import { expect } from "chai";
import { By } from "selenium-webdriver";
import Business, { BusinessAttributes } from "../models/business";
import User, { UserAttributes } from "../models/user/user";
import { businessAttributes, userAttributes } from "../sample_data/attributes";
import BaseWorld from "../support/base_world";
import { login } from "../util/actions/auth";
import { createModel, deleteModel } from "../util/actions/model_actions";
import { client, server } from "../util/permalink";

Given("the user has chosen an environment", function (this: BaseWorld) {
    return;
});

When(
    "a user has navigated to the root of the backend",
    { timeout: 20000 },
    async function (this: BaseWorld) {
        const driver = this.getDriver();
        await driver.get(server);
    }
);

Then(
    "they should be redirected to the frontend",
    async function (this: BaseWorld) {
        const currentUrl = await this.getDriver().getCurrentUrl();
        expect(currentUrl).to.equal(client);
    }
);

Given(
    "the user is logged in",
    { timeout: 10000 },
    async function (this: BaseWorld) {
        await createModel.call(this, User, "user");

        // actual test
        await login.call(this);
    }
);

When("the user refreshes the page", async function (this: BaseWorld) {
    const driver = this.getDriver();
    await driver.navigate().refresh();
    await driver.sleep(2000);
});

Then("they are in the same location", async function (this: BaseWorld) {
    // assertions
    const driver = this.getDriver();

    const header = await driver.findElement(By.css("h1"));
    expect((await header.getText()).toLowerCase()).to.be.equal("home");
});
