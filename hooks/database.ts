import { After, Before } from "@cucumber/cucumber";
import { Connection } from "typeorm";
import BaseWorld from "../support/base_world";
import createConnection from "../models/config";

Before("@database", async function (this: BaseWorld) {
    this.setCustomProp<Connection>("connection", await createConnection());
});

After("@database", async function (this: BaseWorld) {
    await this.getCustomProp<Connection>("connection").close();
});
