const { expandTemplate } = require('./templates')
const { findSpecDir, findTemplateDir } = require('./specheroDir')
const childProcess = require('child_process');
const simpleGit = require('simple-git');

async function createSpec(name, template) {
    // console.log(`You want a new spec called ${name} from the template ${template}`);

    // find template
    let context = buildContext();
    let specDir = findSpecDir(name)
    let templateDir = await findTemplateDir(template);

    await expandTemplate(templateDir, context, specDir);
    await createRepo(specDir);

    let editorCommand = process.env.SPECHERO_EDITOR || "code ."
    childProcess.execSync(editorCommand, { cwd: specDir })

    function buildContext() {
        return {
            template: template,
            name: name,
        };
    }

}

async function createRepo(specDir) {
    const git = simpleGit(specDir);
    await git.init(false, { "--initial-branch": "main" });
}

exports.createSpec = createSpec;
