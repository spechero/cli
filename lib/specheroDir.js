const process = require('process');
const simpleGit = require('simple-git');
const { existsSync } = require('fs');
const { ensureDirExists } = require("./ensureDirExists");
const git = simpleGit();

async function findTemplateDir(template) {
    dir = await findTemplatesDir();
    return `${dir}/${template}`
}

async function findTemplatesDir() {
    dir = `${findSpecheroDir()}/templates`
    if (!existsSync(dir)) {
        await git.clone("https://github.com/spechero/templates", dir);
    }

    return dir
}

function findSpecDir(name) {
    return `${findSpecsDir()}/${name}`
}

function findSpecsDir() {
    return ensureDirExists(`${findSpecheroDir()}/specs`);
}

function findSpecheroDir() {
    dir = process.env.SPECHERO_DIR ||
        `${process.env.HOME}/.spechero`;
    console.log(`Using SPECHERO_DIR: ${dir}`)
    return ensureDirExists(dir)
}

exports.findSpecDir = findSpecDir;
exports.findTemplateDir = findTemplateDir;
