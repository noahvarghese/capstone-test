module.exports = {
    default: [
        "features/**/*.feature",
        "--require-module ts-node/register",
        "--require stepDefinitions/**/*.ts",
        "--require support/**/*.ts",
        "--require hooks/**/*.ts",
        "--publish-quiet"
    ].join(" ")
};