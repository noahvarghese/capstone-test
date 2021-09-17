import { Given, Then, When } from "@cucumber/cucumber";
import { expect } from "chai";
import { By } from "selenium-webdriver";
import Event from "../../models/event";
import User from "../../models/user/user";
import BaseWorld from "../../support/base_world";
import { requestResetPassword } from "../../util/actions/auth";
import { createModel } from "../../util/actions/model_actions";

Given("the user is registered", async function (this: BaseWorld) {
    await createModel.call(this, User, "user");
});

When(
    "the user requests to reset their password",
    { timeout: 15000 },
    async function (this: BaseWorld) {
        const driver = this.getDriver();

        await requestResetPassword.call(this);

        const notification = await driver.findElement(
            By.className("Notification")
        );

        const classes = (await notification.getAttribute("class")).split(" ");

        expect(classes).not.to.contain("error");

        await driver.sleep(5000);
    }
);

Then("a token should be created", async function (this: BaseWorld) {
    const connection = this.getConnection();

    let user = this.getCustomProp<User>("user");
    user = await connection.manager.findOneOrFail(User, {
        where: { email: user.email },
    });

    this.setCustomProp<User>("user", user);

    expect(user.token).to.not.be.equal(undefined);
    expect(user.token).to.not.be.equal(null);
});

Then("it should have an expiry", async function (this: BaseWorld) {
    const user = this.getCustomProp<User>("user");
    expect(user.token_expiry).to.not.be.equal(undefined);
    expect(user.token_expiry).to.not.be.equal(null);
});

Then("the user should receive an email", async function (this: BaseWorld) {
    let eventType;

    if (this.hasTag("@reset_password")) {
        eventType = "";
    } else if (this.hasTag("@request_reset_password")) {
        eventType = "reset password requested";
    } else {
        throw new Error("Event type unknown");
    }

    const connection = this.getConnection();
    const user = this.getCustomProp<User>("user");

    const events = await connection.manager.find(Event, {
        where: { user_id: user.id },
    });

    let found = false;

    for (const event of events) {
        if (event.name.toLowerCase().includes(eventType)) {
            found = true;
            break;
        }
    }

    expect(found).to.be.equal(true);
});
