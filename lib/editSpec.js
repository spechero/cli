const childProcess = require('child_process');
const { findSpecDir } = require('./specheroDir')

async function editSpec(name) {
    let editorCommand = process.env.SPECHERO_EDITOR || "code ."
    const specDir = findSpecDir(name);
    childProcess.execSync(editorCommand, { cwd: specDir })
}

exports.editSpec = editSpec;
