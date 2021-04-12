const childProcess = require('child_process');
const { withExistingSpec } = require('./specheroDir')

async function editSpec(name) {
    let editorCommand = process.env.SPECHERO_EDITOR || "code ."
    withExistingSpec(name, (specDir) =>
        childProcess.execSync(editorCommand, { cwd: specDir })
    )
}

exports.editSpec = editSpec;
