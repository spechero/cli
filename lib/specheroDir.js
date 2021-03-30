const process = require('process');
const simpleGit = require('simple-git');
const { existsSync, mkdirSync } = require('fs');
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

function ensureDirExists(dir) {
    if (!existsSync(dir)) {
        console.log(`Didn't exist. Creating.`)
        mkdirSync(dir, { recursive: true });
    }
    return dir;
}

function findSpecheroDir() {
    dir = process.env.SPECHERO_DIR ||
        `${process.env.HOME}/.spechero`;
    return ensureDirExists(dir)
}

exports.findSpecDir = findSpecDir;
exports.findTemplateDir = findTemplateDir;
