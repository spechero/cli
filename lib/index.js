#!/usr/bin/env node --unhandled-rejections=strict

// Prevent app from exiting until we've resolved all promises
var done = false;
(function wait() { if (!done) setTimeout(wait, 100) })();
function finish() { done = true; }

const { archiveSpec } = require('./archiveSpec')
const { purgeArchive } = require('./purgeArchive')
const { createSpec } = require("./createSpec");
const { startSpec } = require('./startSpec')
const { stopSpec } = require('./stopSpec')
const { editSpec } = require('./editSpec')
const { listSpecs } = require('./listSpecs')
const { listTemplates } = require('./listTemplates')

const templateArg = {
    type: 'string',
    demand: 'true',
    describe: 'the template for the new spec'
};

const nameArg = {
    type: 'string',
    demand: 'true',
    describe: 'the unique name of the spec'
};

const patternArg = {
    type: 'string',
    describe: 'only list specs containing this pattern'
};

require('yargs')
    .scriptName("spechero")
    .usage('$0 <cmd> [args]')
    .command('create template name', 'create a new spec', (yargs) => {
        yargs.positional('template', templateArg)
        yargs.positional('name', nameArg)
    }, function (argv) {
        createSpec(argv.name, argv.template)
            .then(finish);
    })
    .command('new template name', 'create and open a new spec', (yargs) => {
        yargs.positional('template', templateArg)
        yargs.positional('name', nameArg)
    }, function (argv) {
        createSpec(argv.name, argv.template)
            .then(() => startSpec(argv.name))
            .then(() => editSpec(argv.name))
            .then(finish);
    })
    .command('open [name]', 'edit and start spec', (yargs) => {
        yargs.positional('name', nameArg)
    }, function (argv) {
        editSpec(argv.name)
            .then(() => startSpec(argv.name))
            .then(finish);
    })
    .command('edit [name]', 'open spec in your editor', (yargs) => {
        yargs.positional('name', nameArg)
    }, function (argv) {
        editSpec(argv.name)
            .then(finish);
    })
    .command('purge', 'permanently delete all archived specs', (yargs) => {
    }, function (argv) {
        purgeArchive()
            .then(finish);
    })
    .command('start [name]', 'start the spec container', (yargs) => {
        yargs.positional('name', nameArg)
    }, function (argv) {
        startSpec(argv.name)
            .then(finish);
    })
    .command('stop [name]', 'stop the spec container', (yargs) => {
        yargs.positional('name', nameArg)
    }, function (argv) {
        stopSpec(argv.name)
            .then(finish);
    })
    .command('archive [name]', 'stop and archive the spec', (yargs) => {
        yargs.positional('name', nameArg)
    }, function (argv) {
        archiveSpec(argv.name)
            .then(finish);
    })
    .command('list [pattern]', 'list current specs [containing pattern]', (yargs) => {
        yargs.positional('pattern', patternArg)
    }, function (argv) {
        listSpecs(argv.pattern, spec => console.log(spec))
        finish();
    })
    .command('templates [pattern]', 'list available templates [containing pattern]', (yargs) => {
        yargs.positional('pattern', patternArg)
    }, function (argv) {
        listTemplates(argv.pattern, spec => console.log(spec))
            .then(finish);
    })
    .demandCommand(1, 'You need to provide a command')
    .help()
    .argv;

finish()
