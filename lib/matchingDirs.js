const { readdirSync } = require('fs')

function matchingDirs(source, pattern) {
    const dirs = readdirSync(source, { withFileTypes: true })
        .filter(dirent => dirent.isDirectory())
        .map(dirent => dirent.name)

    if (pattern) {
        return dirs.filter(dir => dir.includes(pattern))
    } else {
        return dirs
    }
};

exports.matchingDirs = matchingDirs;
