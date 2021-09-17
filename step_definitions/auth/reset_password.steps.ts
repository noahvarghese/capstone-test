import { Given, Then, When } from "@cucumber/cucumber";
import { expect } from "chai";
import User, { UserAttributes } from "../../models/user/user";
import BaseWorld from "../../support/base_world";
import { requestResetPassword, resetPassword } from "../../util/actions/auth";

Given(
    "the user has requested to reset their password",
    async function (this: BaseWorld) {
        await requestResetPassword.call(this);
    }
);

When("they reset their password", async function (this: BaseWorld) {
    const connection = this.getConnection();

    await resetPassword.call(this);

    // Set to check in then steps
    let user = this.getCustomProp<User>("user");
    user = await connection.manager.findOneOrFail(User, {
        where: { email: user.email },
    });
    this.setCustomProp<User>("user", user);
});

Then("their password is reset", async function (this: BaseWorld) {
    const user = this.getCustomProp<User>("user");
    const userAttr = this.getCustomProp<UserAttributes>("userAttributes");

    expect(await user.comparePassword(userAttr.password)).to.be.equal(true);
});

Then("the token is cleared", async function (this: BaseWorld) {
    const user = this.getCustomProp<User>("user");
    expect(user.token).to.not.be.a("string");
});

Then("the token expiry is cleared", async function (this: BaseWorld) {
    const user = this.getCustomProp<User>("user");
    expect(user.token_expiry).to.not.be.instanceOf(Date);
});
