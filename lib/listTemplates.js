const { readdirSync } = require('fs')
const { findTemplatesDir } = require('./specheroDir')
const { matchingDirs } = require('./matchingDirs')

async function listTemplates(pattern, printFunc) {
    const templatesDir = await findTemplatesDir();
    const templates = matchingDirs(templatesDir, pattern)
        .filter(name => name != '.git')
    templates.forEach(printFunc)
}

exports.listTemplates = listTemplates;
