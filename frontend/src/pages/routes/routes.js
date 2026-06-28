const modules = require.context("../../pages", true, /\.js$/);

export const componentMap = {};

modules.keys().forEach((fileName) => {
    const module = modules(fileName).default;

    const name = fileName
        .replace("./", "")
        .replace(".js", "")
        .split("/")
        .pop();

    componentMap[name] = module;
});