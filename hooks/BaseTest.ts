import { Before, After } from "@cucumber/cucumber";
import {
    Builder,
    Capabilities,
    ThenableWebDriver,
    WebDriver,
} from "selenium-webdriver";
import BaseWorld from "../support/BaseWorld";
import aws from "aws-sdk";
import dotenv from "dotenv";
import AwsWrapper from "../util/AwsWrapper";
dotenv.config();

const RUN_LOCAL = JSON.parse(process.env.RUN_LOCAL!) as boolean;

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

Before(function (this: BaseWorld) {
    if (RUN_LOCAL === false) {
        AwsWrapper.Init();
    }
});

// Set crazy timeouts so the session gets created and the return value is received
Before({ timeout: 120000 }, async function (this: BaseWorld) {
    if (RUN_LOCAL === false) {
        await AwsWrapper.SetDriver();
    }
});

Before(async function (this: BaseWorld) {
    if (RUN_LOCAL) {
        this.setDriver(getDriver());
    } else {
        this.setDriver(AwsWrapper.getDriver());
    }
});

// Set crazy timeouts so the session gets destroyed and the return is received
After({ timeout: 120000 }, async function (this: BaseWorld) {
    await this.getDriver().quit();
});
