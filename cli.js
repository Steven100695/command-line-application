const yargs = require('yargs/yargs');

const app = require('./app.js');

yargs(process.argv.slice(2))
    .usage('$0: Usage <command> [options]')
    .command(
        'search brand <name>',
        'search phone by brand or model',
        (yargs) => {
            return (yargs
                .positional('name', {
                    describe: 'name of the brand (use underscore instead of space)',
                    type: 'string',
                })
            );
        },
        (args) => {
            //invoke search function
            app.search(args);
        }
    )
    .help()
    .argv;