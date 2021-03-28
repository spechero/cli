#!/usr/bin/env node

const { createSpec } = require("./createSpec");

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
        createSpec(argv.name, argv.template);
    })
    .help()
    .argv;
