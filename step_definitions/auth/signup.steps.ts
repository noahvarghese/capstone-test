import { After, Given, When } from "@cucumber/cucumber";
import { By } from "selenium-webdriver";
import Business, { BusinessAttributes } from "../../models/business";
import {
    businessAttributes,
    userAttributes,
} from "../../sample_data/attributes";
import BaseWorld from "../../support/base_world";
import { createModel } from "../../util/model_actions";
import { client } from "../../util/permalink";
import { submitForm } from "../../util/ui_actions";

const existingBusiness = {
    address: userAttributes.address,
    birthday: userAttributes.birthday,
    city: userAttributes.city,
    confirm_password: userAttributes.password,
    email: userAttributes.email,
    first_name: userAttributes.first_name,
    last_name: userAttributes.last_name,
    password: userAttributes.password,
    phone: userAttributes.phone,
    postal_code: userAttributes.postal_code,
    province: userAttributes.province,
    business_code: businessAttributes.code,
};

const newBusiness = {
    address: userAttributes.address,
    birthday: userAttributes.birthday,
    city: userAttributes.city,
    confirm_password: userAttributes.password,
    email: userAttributes.email,
    first_name: userAttributes.first_name,
    last_name: userAttributes.last_name,
    password: userAttributes.password,
    phone: userAttributes.phone,
    postal_code: userAttributes.postal_code,
    province: userAttributes.province,
    business_address: businessAttributes.address,
    business_city: businessAttributes.city,
    business_email: businessAttributes.email,
    business_name: businessAttributes.name,
    business_phone: businessAttributes.phone,
    business_postal_code: businessAttributes.postal_code,
    business_province: businessAttributes.province,
};

Given("the user has valid inputs", async function (this: BaseWorld) {
    this.setCustomProp(
        "details",
        this.hasTag("@business_exists") ? existingBusiness : newBusiness
    );
    this.getDriver().get(client);
    await this.getDriver().sleep(1000);
});

Given("the business is registered", async function (this: BaseWorld) {
    await createModel.call(this, Business, "business");
});

When(
    "a new user registers for an existing business",
    { timeout: 30000 },
    async function (this: BaseWorld) {
        const driver = this.getDriver();

        const registerBtn = await driver.findElement(
            By.css("button[type=button]")
        );
        registerBtn.click();

        await submitForm.call(this, this.getCustomProp("details"));
    }
);

When(
    "a new user registers a new business",
    { timeout: 30000 },
    async function (this: BaseWorld) {
        const driver = this.getDriver();

        const registerBtn = await driver.findElement(
            By.css("button[type=button]")
        );
        registerBtn.click();

        await driver.sleep(1000);

        const checkbox = await driver.findElement(
            By.css("input[type=checkbox]")
        );
        (
            await checkbox.findElement(By.xpath("./following-sibling::label"))
        ).click();
        // checkbox.click();

        await submitForm.call(this, this.getCustomProp("details"));
    }
);
