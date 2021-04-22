import { Before, After } from "@cucumber/cucumber";
import { Builder, Capabilities, ThenableWebDriver, WebDriver } from "selenium-webdriver";
import BaseWorld from "../support/BaseWorld";
import aws from "aws-sdk";
import dotenv from "dotenv";
import AwsWrapper from "../util/AwsWrapper";
dotenv.config(); 

const RUN_LOCAL = JSON.parse(process.env.RUN_LOCAL!) as boolean;

const getDriver = (options?: any): ThenableWebDriver => {
    const capabilities: Capabilities = Capabilities.chrome();

    const browserOptions = {
        w3c: false,
        ...options
    };

    capabilities.set("chromeOptions", browserOptions);

    const driver =
        new Builder()
            .withCapabilities(capabilities)
            .forBrowser("chrome")
            .build();

    return driver;
}

Before(async function (this: BaseWorld) {


    let driver: ThenableWebDriver | WebDriver;

    if ( RUN_LOCAL ) {
        driver = getDriver();
    }
    else {
        driver = await AwsWrapper.getDriver();
    }
    
    this.setDriver(driver);
});

After(async function (this: BaseWorld) {
    await this.getDriver().quit();
});
