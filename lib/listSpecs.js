const { readdirSync } = require('fs')
const { findSpecsDir } = require('./specheroDir')
const { matchingDirs } = require('./matchingDirs')

function listSpecs(pattern, printFunc) {
    const specsDir = findSpecsDir();
    const specs = matchingDirs(specsDir, pattern)
    specs.forEach(printFunc)
}


exports.listSpecs = listSpecs;
