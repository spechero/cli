const { execForSpec } = require('./specheroDir')

async function stopSpec(name) {
    let containerCommand = process.env.SPECHERO_STOP_CONTAINERS
        || "docker-compose down --remove-orphans"
    execForSpec(name, containerCommand);
}

exports.stopSpec = stopSpec;
