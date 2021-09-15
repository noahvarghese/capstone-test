import { Before, After } from "@cucumber/cucumber";
import { Builder, Capabilities, ThenableWebDriver } from "selenium-webdriver";
import BaseWorld from "../support/base_world";
import dotenv from "dotenv";
dotenv.config();


const getDriver = (): ThenableWebDriver => {
    const capabilities: Capabilities = Capabilities.chrome();

    const browserOptions = {
        w3c: false,
    };

    capabilities.set("chromeOptions", browserOptions);

    const driver = new Builder()
        .withCapabilities(capabilities)
        .forBrowser("chrome")
        .build();

    return driver;
};


Before(async function (this: BaseWorld) {
        this.setDriver(getDriver());
});

// Set crazy timeouts so the session gets destroyed and the return is received
After({ timeout: 120000 }, async function (this: BaseWorld) {
    await this.getDriver().quit();
});
