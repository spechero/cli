const { execForSpec } = require('./specheroDir')

async function startSpec(name) {
    let containerCommand = process.env.SPECHERO_START_CONTAINERS
        || "docker-compose up -d"
    execForSpec(name, containerCommand);
}

exports.startSpec = startSpec;
