import { After, Before } from "@cucumber/cucumber";
import User, { UserAttributes } from "../models/user/user";
import Business, { BusinessAttributes } from "../models/business";
import { businessAttributes, userAttributes } from "../sample_data/attributes";
import { createModel, deleteModel } from "../util/model_actions";
import BaseWorld from "../support/base_world";

Before({ tags: "@login" }, async function (this: BaseWorld) {
    this.setCustomProp<BusinessAttributes>(
        "businessAttributes",
        businessAttributes
    );
    const business = (await createModel.call(
        this,
        Business,
        "business"
    )) as Business;
    this.setCustomProp<UserAttributes>("userAttributes", {
        ...userAttributes,
        business_id: business.id,
    });
});

After({ tags: "@login" }, async function (this: BaseWorld) {
    await deleteModel.call(this, "user");
    await deleteModel.call(this, "business");
});
