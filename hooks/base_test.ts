import { Before, After } from "@cucumber/cucumber";
import { Builder, Capabilities, ThenableWebDriver } from "selenium-webdriver";
import chrome from "selenium-webdriver/chrome";
import BaseWorld from "../support/base_world";
import dotenv from "dotenv";
dotenv.config();

const getDriver = (): ThenableWebDriver | undefined => {
    const capabilities: Capabilities = Capabilities.chrome();

    capabilities.set("chromeOptions", { w3c: false });

    if (process.env.TEST_ENV === "LOCAL") {
        const driver = new Builder()
            .withCapabilities(capabilities)
            .forBrowser("chrome")
            .build();

        return driver;
    }

    return new Builder()
        .withCapabilities(capabilities)
        .forBrowser("chrome")
        .setChromeOptions(new chrome.Options().headless())
        .build();
};

Before(async function (this: BaseWorld) {
    this.setDriver(getDriver()!);
});

// Load tags into the world
Before(function (this: BaseWorld, { pickle }) {
    const newTags = pickle.tags
        ?.map((tag) => tag.name)
        .filter((tag) => tag !== null && tag !== undefined) as
        | string[]
        | undefined;

    this.setTags(newTags ?? new Array<string>());
});

// Set crazy timeouts so the session gets destroyed and the return is received
After({ timeout: 120000 }, async function (this: BaseWorld) {
    await this.getDriver().quit();
});
