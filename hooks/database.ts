import { After, Before } from "@cucumber/cucumber";
import BaseWorld from "../support/base_world";
import createConnection from "../config/database";
import User, { UserAttributes } from "../models/user/user";
import Event from "../models/event";
import Business, { BusinessAttributes } from "../models/business";
import { businessAttributes, userAttributes } from "../sample_data/attributes";
import { createModel, deleteModel } from "../util/actions/model_actions";

Before("@database", async function (this: BaseWorld) {
    this.setConnection(await createConnection());
});

Before({ tags: "@auth" }, async function (this: BaseWorld) {
    this.setCustomProp<BusinessAttributes>(
        "businessAttributes",
        businessAttributes
    );

    let userProps = userAttributes;

    if (!this.hasTag("@signup")) {
        const business = (await createModel.call(
            this,
            Business,
            "business"
        )) as Business;

        userProps = { ...userProps, business_id: business.id };
    }

    this.setCustomProp<UserAttributes>("userAttributes", userProps);
});

After("@database", async function (this: BaseWorld) {
    this.getConnection().close();
});

After({ tags: "@auth" }, async function (this: BaseWorld) {
    const connection = this.getConnection();
    if (
        this.hasTag("@signup") ||
        this.hasTag("@reset_password") ||
        this.hasTag("@request_reset_password")
    ) {
        const userAttr = this.getCustomProp<UserAttributes>("userAttributes");

        const user = await connection.manager.findOneOrFail(User, {
            where: { email: userAttr.email },
        });

        const events = await connection.manager.find(Event, {
            where: [{ business_id: user.business_id }, { user_id: user.id }],
        });

        for (const event of events) {
            await connection.manager.remove(Event, event);
        }

        await connection.manager.remove(User, user);
    } else {
        await deleteModel.call(this, "user");
    }

    if (this.hasTag("@signup") && !this.hasTag("@business_exists")) {
        const business = await connection.manager.findOneOrFail(Business, {
            where: { email: businessAttributes.email },
        });
        await connection.manager.remove(Business, business);
    } else {
        await deleteModel.call(this, "business");
    }
});
