const { expandTemplate } = require('./templates')
const { findSpecDir, findTemplateDir } = require('./specheroDir')
const childProcess = require('child_process');

async function createSpec(name, template) {
    // console.log(`You want a new spec called ${name} from the template ${template}`);

    // find template
    let context = buildContext();
    let specDir = findSpecDir(name)
    let templateDir = await findTemplateDir(template);

    await expandTemplate(templateDir, context, specDir);
    // process.chdir(specDir)

    // TODO: open editor in specDir
    let editorCommand = process.env.SPECHERO_EDITOR
    console.log("Editor command: " + editorCommand)
    childProcess.execSync(editorCommand)
    // TODO: docker-compose up -d

    function buildContext() {
        return {
            template: template,
            name: name,
        };
    }
}

exports.createSpec = createSpec;
