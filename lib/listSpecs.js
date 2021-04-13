const { readdirSync } = require('fs')
const { findSpecsDir } = require('./specheroDir')

function listSpecs(pattern, printFunc) {
    const specsDir = findSpecsDir();
    const specs = getSpecs(specsDir, pattern)
    specs.forEach(printFunc)
}

function getSpecs(source, pattern) {
    const specs = readdirSync(source, { withFileTypes: true })
        .filter(dirent => dirent.isDirectory())
        .map(dirent => dirent.name)

    if (pattern) {
        return specs.filter(spec => spec.includes(pattern))
    } else {
        return specs
    }


};

exports.listSpecs = listSpecs;
