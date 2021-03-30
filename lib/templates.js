const readdirp = require('readdirp');
const Handlebars = require("handlebars");
const { readFile, writeFile } = require('fs').promises;
const { ensureDirExists } = require("./ensureDirExists");
const { dirname } = require('path');

async function expandTemplate(templateDir, context, target) {
    console.log(`starting expandTemplate of ${templateDir}`)
    for await (const entry of readdirp(templateDir)) {
        const { path } = entry;
        console.log(`${path}`);
        // console.log(entry);

        let template = await read(entry.fullPath);
        let compiled = Handlebars.compile(template);

        let targetPath = `${target}/${entry.path}`;
        let targetDir = dirname(targetPath);
        ensureDirExists(targetDir);

        await writeFile(targetPath, compiled(context));
    }
    console.log("finishing expandTemplate")
};

async function read(filePath) {
    try {
        const data = await readFile(filePath, { encoding: 'utf8' })
        return data;
    } catch (error) {
        console.error(error.message)
    }
}

exports.expandTemplate = expandTemplate;
