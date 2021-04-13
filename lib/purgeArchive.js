const { rmSync } = require('fs')
const { findArchivesDir } = require('./specheroDir')

async function purgeArchive() {
    const archivesDir = findArchivesDir();
    rmSync(archivesDir, { recursive: true });
}

exports.purgeArchive = purgeArchive;
