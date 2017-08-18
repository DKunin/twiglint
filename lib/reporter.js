'use strict';

const formatter = {
    compact: require('./formatters/compact'),
    stylish: require('./formatters/stylish-adapter')
};

module.exports = function(results, format = 'stylish') {
    if (!formatter[format]) {
        // eslint-disable-next-line
        console.warn(format, ' - unknown format oprion');
        return;
    }

    // eslint-disable-next-line
    console.log(formatter[format](results));
};
