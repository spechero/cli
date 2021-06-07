const childProcess = require('child_process')
const { withExistingSpec } = require('./specheroDir')

function editSpec(name) {
    let editorCommand = process.env.SPECHERO_EDITOR || "code ."
    withExistingSpec(name, (specDir) => {
        try {
            childProcess.execSync(editorCommand, { cwd: specDir })
        } catch (e) {
            console.log(`Warning: executing '${editorCommand}' returned non-zero exit code ${e.status}: ${e.stderr}`)
        }
    })
}

exports.editSpec = editSpec
