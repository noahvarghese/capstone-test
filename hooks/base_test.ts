import { Before, After } from "@cucumber/cucumber";
import { Builder, Capabilities, ThenableWebDriver } from "selenium-webdriver";
import chrome from "selenium-webdriver/chrome";
import BaseWorld from "../support/base_world";
import dotenv from "dotenv";
dotenv.config();


const getDriver = (): ThenableWebDriver | undefined => {
    const capabilities: Capabilities = Capabilities.chrome();

    capabilities.set("chromeOptions", {w3c: false});
    // console.log("HELLO", process.env);

    if (process.env.TEST_ENV === "CI") {

        const driver = new Builder()
            .withCapabilities(capabilities)
            .forBrowser("chrome")
            .setChromeOptions(new chrome.Options().headless())
            .build();
        console.log("HERE")
        console.log(driver);
        return driver;
    }

    else if (process.env.TEST_ENV === "LOCAL") {
        const driver = new Builder()
            .withCapabilities(capabilities)
            .forBrowser("chrome")
            .build();

        return driver;
    }
};


Before(async function (this: BaseWorld) {
        this.setDriver(getDriver()!);
});

// Set crazy timeouts so the session gets destroyed and the return is received
After({ timeout: 120000 }, async function (this: BaseWorld) {
    await this.getDriver().quit();
});
