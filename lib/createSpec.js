const { expandTemplate } = require('./templates')
const { findSpecDir, findTemplateDir } = require('./specheroDir')
const simpleGit = require('simple-git');

async function createSpec(name, template) {
    const context = {
        template: template,
        name: name,
    }

    const specDir = findSpecDir(name)
    const templateDir = await findTemplateDir(template);
    await expandTemplate(templateDir, context, specDir);
    await createRepo(specDir);
}

async function createRepo(specDir) {
    const git = simpleGit(specDir);
    await git.init(false, { "--initial-branch": "main" });
}

exports.createSpec = createSpec;
