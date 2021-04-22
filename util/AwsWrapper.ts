import AWS from "aws-sdk";
import dotenv from "dotenv";
import { Builder, ThenableWebDriver } from "selenium-webdriver";
dotenv.config(); 

export default class AwsWrapper {
    private static aws: any;
    private static _driver: ThenableWebDriver;

    private static Init = () => {
        AwsWrapper.aws = AWS;

        AwsWrapper.aws.config.credentials = {
            accessKeyId: process.env.AWS_ACCESS_KEY_ID!, 
            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY! 
        };
    }

    private static SetDriver = async () => {
        const projectArn = process.env.ARN!;
        const deviceFarm = new AwsWrapper.aws.DeviceFarm({ region: "ca-central-1" });

        const url = await deviceFarm.createTestGridUrl({
            projectArn,
            expiresInSeconds: 600
        });

        AwsWrapper._driver = new Builder()
                                .usingServer(url)
                                .withCapabilities({ browserName: "chrome", w3c: false })
                                .build();
    }


    static getDriver = async (): Promise<ThenableWebDriver> => {
        if ( !AwsWrapper.aws ) {
            AwsWrapper.Init();
        }
        if ( !AwsWrapper._driver) {
            await AwsWrapper.SetDriver();
        }

        return AwsWrapper._driver!;
    }
}