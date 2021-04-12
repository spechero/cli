#!/usr/bin/env node --unhandled-rejections=strict

// Prevent app from exiting until we've resolved all promises
var done = false;
(function wait() { if (!done) setTimeout(wait, 100) })();
function finish() { done = true; }

const { createSpec } = require("./createSpec");
const { startSpec } = require('./startSpec')
const { editSpec } = require('./editSpec')

// spechero new ruby-rspec calc
require('yargs')
    .scriptName("spechero")
    .usage('$0 <cmd> [args]')
    .command('new template [name]', 'create a new spec', (yargs) => {
        yargs.positional('template', {
            type: 'string',
            describe: 'the template for the new spec'
        })
        yargs.positional('name', {
            type: 'string',
            describe: 'the unique name of the spec'
        })
    }, function (argv) {
        createSpec(argv.name, argv.template)
            .then(() => startSpec(argv.name))
            .then(() => editSpec(argv.name))
            .then(finish);
    })
    .help()
    .argv;
