import { fail } from "assert";
import { By } from "selenium-webdriver";
import User, { UserAttributes } from "../../../models/user/user";
import BaseWorld from "../../../support/base_world";
import { client } from "../../permalink";
import { submitForm } from "../ui_actions";

export async function requestResetPassword(this: BaseWorld) {
    const driver = this.getDriver();
    await driver.get(client);
    await this.getDriver().sleep(1000);

    const requestResetLink = await driver.findElement(
        By.partialLinkText("reset your password")
    );
    requestResetLink.click();

    await submitForm.call(this, {
        email: this.getCustomProp<User>("user").email,
    });
}

export async function login(this: BaseWorld) {
    const driver = this.getDriver();
    await driver.get(client);
    await this.getDriver().sleep(1000);

    const user = this.getCustomProp<UserAttributes>("userAttributes");

    await submitForm.call(this, {
        email: user.email,
        password: user.password,
    });

    await driver.sleep(3000);
}

export async function signup(this: BaseWorld, newBusiness: boolean) {
    const driver = this.getDriver();
    await driver.get(client);
    await this.getDriver().sleep(1000);

    const registerBtn = await driver.findElement(By.css("button[type=button]"));
    registerBtn.click();

    await driver.sleep(500);

    if (newBusiness) {
        const checkbox = await driver.findElement(
            By.css("input[type=checkbox]")
        );
        (
            await checkbox.findElement(By.xpath("./following-sibling::label"))
        ).click();
    }

    await submitForm.call(this, this.getCustomProp("details"));
    // Needs a longer timeout to account for more backend calls happening
    await driver.sleep(3000);
}

export async function resetPassword(this: BaseWorld) {
    const newPassword = "newpassword";

    const driver = this.getDriver();
    const connection = this.getConnection();

    let user = this.getCustomProp<User>("user");
    user = await connection.manager.findOneOrFail(User, {
        where: { email: user.email },
    });

    if (!user.token || !user.token_expiry) {
        fail("token and expiry not set");
    }

    await driver.get(client + "resetPassword/" + user.token);
    await driver.sleep(1000);

    const userAttr = this.getCustomProp<UserAttributes>("userAttributes");
    userAttr.password = newPassword;

    await submitForm.call(
        this,
        { password: newPassword, confirm_password: newPassword },
        false
    );
}
