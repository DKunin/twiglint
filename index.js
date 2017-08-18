#!/usr/bin/env node

'use strict';

const pkg = require('./package.json');
const meow = require('meow');
const twiglint = require('./lib/twig');
const reporter = require('./lib/reporter');

const twiglintConfig = require('./.twiglintrc');
const appliedPlugins = twiglintConfig.plugins.map(singlePluginName =>
    require(`./plugins/twiglint-plugin-${singlePluginName}`)
);

const cli = meow(
    `
    Usage
      $ twiglint <filename>

    Options
      -f, --format Use a specific output format - default: stylish [compact]
      -s, --silent Show only errors
      -v, --version Show current version of the module
      -d, --debug Write debug file, and prepend every check with filename
      -h, --help  This help
    `,
    {
        alias: {
            f: 'format',
            s: 'silent',
            d: 'debug'
        }
    }
);

const filePath = cli.input;
console.log(filePath);
if (cli.flags.h) {
    // eslint-disable-next-line
    console.log(cli.help);
    process.exit(1);
}

if (cli.flags.v) {
    // eslint-disable-next-line
    console.log(pkg.version);
    process.exit(1);
}

if (!filePath.length) {
    // eslint-disable-next-line
    console.error('Please provide file path');
    process.exit(1);
}

const allReports = filePath.map(singleFilePath => {
    return twiglint(singleFilePath, cli.flags).then(result => {
        if (cli.flags.d) {
            // eslint-disable-next-line
            console.log(`Processing file: ${singleFilePath}`);
        }
        const allTheErorrs = appliedPlugins
            .reduce((allErrorsArray, singlePlugin) => {
                return allErrorsArray.concat(
                    singlePlugin(result, singleFilePath, twiglintConfig)
                );
            }, [])
            .map(singleError => {
                if (cli.flags.silent) {
                    singleError.messages = singleError.messages.filter(
                        singleMessage => singleMessage.fatal
                    );
                }
                return singleError;
            });
        return allTheErorrs;
    });
});

Promise.all(allReports).then(allReportsResolved => {
    var all = allReportsResolved.reduce((acc, el) => acc.concat(el), []);
    reporter(all, cli.flags.format);
});
