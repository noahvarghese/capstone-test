import AWS, { DeviceFarm } from "aws-sdk";
import dotenv from "dotenv";
import {
    Builder,
    Capabilities,
    ThenableWebDriver,
    WebDriver,
} from "selenium-webdriver";
dotenv.config();

export default class AwsWrapper {
    private static loaded = false;
    private static _driver: ThenableWebDriver | WebDriver;
    private static DeviceFarm: {
        projectArn: string;
        deviceFarm?: DeviceFarm;
    } = {
        projectArn: "",
        deviceFarm: undefined,
    };

    static Init = () => {
        AwsWrapper.loaded = true;
        AWS.config.credentials = {
            accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
        };

        AwsWrapper.DeviceFarm.projectArn = process.env.AWS_DEVICE_FARM_ARN!;
        AwsWrapper.DeviceFarm.deviceFarm = new AWS.DeviceFarm({
            region: "us-west-2",
        });
    };

    private static getUrlResult = async (): Promise<any> => {
        return new Promise((res, rej) => {
            const deviceFarm = AwsWrapper.DeviceFarm.deviceFarm as any;

            deviceFarm.createTestGridUrl(
                {
                    projectArn: AwsWrapper.DeviceFarm.projectArn,
                    expiresInSeconds: 600,
                },
                (err: any, data: any) => {
                    if (err) {
                        rej(err);
                    }

                    res(data);
                }
            );
        });
    };

    static SetDriver = async () => {
        const urlResult = await AwsWrapper.getUrlResult();

        // w3c: false,
        const driver = await new Builder()
            .usingServer(urlResult.url)
            .withCapabilities({
                browserName: "chrome",
            })
            .build();

        AwsWrapper._driver = driver;
        return;
    };

    static getDriver = (): ThenableWebDriver | WebDriver => {
        return AwsWrapper._driver;
    };
}
