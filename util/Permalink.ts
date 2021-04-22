import dotenv from "dotenv";
dotenv.config();

interface URL {
    TARGET_DEV?: string;
    TARGET_LOCAL?: string;
    TARGET_PROD?: string;
}

const getPermalink = () => {
    const {TARGET_DEV, TARGET_ENV, TARGET_LOCAL, TARGET_PROD} = process.env;

    const urls: URL[] = [{TARGET_DEV}, {TARGET_LOCAL}, {TARGET_PROD}];

    const urlKey = `TARGET_${TARGET_ENV}` as keyof URL;
    let urlToUse = urls.find((url) => url[urlKey] !== undefined);

    if ( urlToUse ) {
        return urlToUse[urlKey];
    }
    throw new Error("Permalink not implmented yet.");
}

export default getPermalink;