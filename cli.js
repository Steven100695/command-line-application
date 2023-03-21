const yargs = require('yargs/yargs');

yargs(process.argv.slice(2))
    .usage('$0: Uage <command>')
    .command(
        'search <brands> <phones>',
        'search phone specs',
        (yargs) => {
            return yargs
                .positional('brands', {
                    describe: 'name of the brand',
                    type: 'string',
                })
                .positional('phones', {
                    describe: 'name of the phone',
                    type: 'string',
                });
        },
        (args) => {
            console.log(args);
        }
    ).help().argv;