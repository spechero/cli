const { expandTemplate } = require('./templates')
const { findSpecDir, findTemplateDir } = require('./specheroDir')
const childProcess = require('child_process');

async function shareSpec(name) {
    console.log(`You want to share a spec called ${name}`);
}

exports.shareSpec = shareSpec;
