const { findSpecDir } = require('./specheroDir')
const childProcess = require('child_process');

async function startSpec(name) {
    let specDir = findSpecDir(name)
    let containerCommand = process.env.SPECHERO_START_CONTAINERS || "docker-compose up -d"
    childProcess.execSync(containerCommand, { cwd: specDir })
}

exports.startSpec = startSpec;
