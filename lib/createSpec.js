const process = require('process');
const { existsSync, mkdirSync } = require('fs');
const simpleGit = require('simple-git');
const git = simpleGit();
const { expandTemplate } = require('./templates')

async function createSpec(name, template) {
    // console.log(`You want a new spec called ${name} from the template ${template}`);

    // find template
    let context = buildContext();
    let specDir = findSpecDir(name)
    let templateDir = await findTemplateDir(template);

    await expandTemplate(templateDir, context, specDir);
    // process.chdir(specDir)

    // TODO: open editor in specDir
    // TODO: docker-compose up -d

    function buildContext() {
        return {
            template: template,
            name: name,
        };
    }

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
        // console.log(`Ensuring dir exists: ${dir}`)
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

}

exports.createSpec = createSpec;
