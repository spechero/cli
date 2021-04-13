const { withExistingSpec, archive } = require('./specheroDir')
const { stopSpec } = require('./stopSpec')

async function archiveSpec(name) {
    withExistingSpec(name, (_specDir) => {
        stopSpec(name)
        archive(name)
    })
}

exports.archiveSpec = archiveSpec;
