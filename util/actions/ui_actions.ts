import { By, WebElement } from "selenium-webdriver";
import BaseWorld from "../../support/base_world";
import Logs from "../logs/logs";

// Expects that the keys are the ids of the form elements
export async function submitForm<T>(
    this: BaseWorld,
    formValues: T,
    debug?: boolean
) {
    const driver = this.getDriver();

    for (const entry of Object.entries(formValues)) {
        await driver.sleep(1000);
        const key = entry[0];
        let value = entry[1];

        if (debug) {
            Logs.Debug(key, value);
        }
        const inputEl = await driver.findElement(By.id(key));

        // this accounts for my custom select
        // not for regular HTML select elemtns
        // because it needs to be set visually I need to go and
        // make this more accesible for those who wouldn't operate this with a mouse/touchscreen
        if ((await inputEl.getTagName()) === "select") {
            (await inputEl.findElement(By.xpath("./.."))).click();
            const option: Partial<WebElement> = await getElementByText.call(
                this,
                "div",
                value as string
            )!;

            await driver.sleep(500);

            if (option.click) await option.click();
            else
                throw new Error(
                    "Unable to click element" + JSON.stringify(option)
                );
        } else {
            if (value instanceof Date) {
                const year = value.getFullYear();
                const month =
                    (value.getMonth().toString().length === 1 ? "0" : "") +
                    (Number(value.getMonth()) < 12 ? value.getMonth() + 1 : 1);
                const day =
                    (value.getDate().toString().length === 1 ? "0" : "") +
                    value.getDate();

                value = `${month}${day}${year}`;
            }

            await inputEl.sendKeys(value);
        }
    }

    const submitButton = await driver.findElement(
        By.css("button[type=submit]")
    );
    await submitButton.click();
    await driver.sleep(1000);
}

export async function getElementByText(
    this: BaseWorld,
    tagName: string,
    elementText: RegExp | string
): Promise<(WebElement & any) | undefined> {
    const driver = this.getDriver();

    const elements = await driver.findElements(By.css("div"));

    let found;

    const compare =
        elementText instanceof RegExp
            ? (text: string) => elementText.test(text)
            : (text: string) => elementText === text;

    for (const el of elements) {
        if (compare((await el.getText()) ?? "")) {
            found = el;
            break;
        }
    }

    return found;
}
