import { setWorldConstructor, World, IWorldOptions } from "@cucumber/cucumber";
import { ThenableWebDriver, WebDriver } from "selenium-webdriver";
import { Connection } from "typeorm";

export default class BaseWorld extends World {
    private _driver: ThenableWebDriver | WebDriver | undefined;
    private _connection: Connection | undefined;
    private _props: any;
    private _tags: string[] = [];

    constructor(options: IWorldOptions) {
        super(options);
        this._props = {};
    }

    setTags = (newTags: string[]) => (this._tags = newTags);

    hasTag = (searchVal: string) => {
        return this._tags.includes(searchVal);
    };

    setDriver = (driver: ThenableWebDriver | WebDriver): void => {
        this._driver = driver;
        return;
    };

    getDriver = (): ThenableWebDriver | WebDriver => {
        if (this._driver) {
            return this._driver;
        }

        throw new Error("Driver not intialized.");
    };

    setConnection = (connection: Connection): void => {
        this._connection = connection;
        return;
    };

    getConnection = (): Connection => {
        if (this._connection) {
            return this._connection;
        }

        throw new Error("Connection not intialized.");
    };

    setCustomProp = <T>(key: string, value: T): void => {
        this._props[key] = value;
        return;
    };

    getCustomProp = <T>(key: string): T => {
        return this._props[key];
    };
}

setWorldConstructor(BaseWorld);
