const fs = require("fs");
const process = require('process');
const simpleGit = require('simple-git');
const { existsSync } = require('fs');
const { ensureDirExists } = require("./ensureDirExists");
const childProcess = require('child_process');

async function findTemplateDir(template) {
    dir = await findTemplatesDir();
    return `${dir}/${template}`
}

async function findTemplatesDir() {
    dir = `${findSpecheroDir()}/templates`
    if (!existsSync(dir)) {
        const git = simpleGit();
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

function execForSpec(name, command) {
    withExistingSpec(name, (specDir) =>
        childProcess.execSync(command, { cwd: specDir })
    )
}

function withExistingSpec(name, func) {
    const specDir = findSpecDir(name);
    if (fs.existsSync(specDir)) {
        return func(specDir);
    } else {
        console.log(`Couldn't find a spec called '${name}'`)
    }
}

function findSpecheroDir() {
    dir = process.env.SPECHERO_DIR ||
        `${process.env.HOME}/.spechero`;
    return ensureDirExists(dir)
}

exports.findSpecDir = findSpecDir;
exports.findTemplateDir = findTemplateDir;
exports.withExistingSpec = withExistingSpec;
exports.execForSpec = execForSpec;
