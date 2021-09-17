import { Given, When } from "@cucumber/cucumber";
import Business from "../../models/business";
import {
    businessAttributes,
    userAttributes,
} from "../../sample_data/attributes";
import BaseWorld from "../../support/base_world";
import { createModel } from "../../util/actions/model_actions";
import { signup } from "../../util/actions/auth";

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
});

Given("the business is registered", async function (this: BaseWorld) {
    await createModel.call(this, Business, "business");
});

When(
    "a new user registers for an existing business",
    { timeout: 30000 },
    async function (this: BaseWorld) {
        await signup.call(this, false);
    }
);

When(
    "a new user registers a new business",
    { timeout: 30000 },
    async function (this: BaseWorld) {
        await signup.call(this, true);
    }
);
