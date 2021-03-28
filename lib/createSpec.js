const process = require('process');
// const file = require('file');
const { existsSync, mkdirSync } = require('fs');
const simpleGit = require('simple-git');
const git = simpleGit();

function createSpec(name, template) {
    console.log(`You want a new spec called ${name} from the template ${template}`);

    // find template
    templateDir = findTemplateDir(template)
    context = buildContext();

    specDir = findSpecDir()
    process.chdir(specDir)
    // expand template files recursively
    // TODO: open editor in specDir
    // TODO: docker-compose up -d

    function buildContext() {
        return {
            template: template,
            name: name,
        };
    }

    function findTemplateDir(template) {
        return `${findTemplatesDir()}/${template}`
    }

    function findTemplatesDir() {
        dir = `${findSpecheroDir()}/templates`
        if (!existsSync(dir)) {
            gitClone("https://github.com/spechero/templates", dir);
        }

        return dir
    }

    function findSpecDir() {
        return ensureDirExists(`${findSpecheroDir()}/specs`);
    }

    function ensureDirExists(dir) {
        console.log(`Ensuring dir exists: ${dir}`)
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

    async function gitClone(repo, dir) {
        await git.clone(repo, dir);
    }

}
exports.createSpec = createSpec;
