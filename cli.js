const yargs = require('yargs/yargs');

const app = require('./app.js');

yargs(process.argv.slice(2))
    .usage('$0: Usage <command> [options]')
    .command(
        'search <type> <name>',
        'search phone by brand or model',
        (yargs) => {
            return (yargs
                .positional('type', {
                    describe: 'type of search',
                    type: 'string',
                    choices: ['brand', 'model'],
                })
                .positional('name', {
                    describe: 'name of the brand or model',
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