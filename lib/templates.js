const readdirp = require('readdirp');

async function expandTemplate(templateDir, context, target) {
    console.log(`starting expandTemplate of ${templateDir}`)
    for await (const entry of readdirp(templateDir)) {
        const { path } = entry;
        console.log(`${path}`);
    }
    console.log("finishing expandTemplate")
};

exports.expandTemplate = expandTemplate;
