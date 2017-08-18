'use strict';
function extend(Twig) {
    const assetsToken = {
        type: 'assets',
        regex: /^assets(?:\s+(.+))?$/,
        next: ['endassets'],
        open: true,
        compile(token) {
            const compiledToken = token;
            const match = token.match;
            delete token.match;
            compiledToken.stack = match[1] == null ?
                [] :
                Twig.expression.compile.apply(this, [
                    {
                        type: Twig.expression.type.expression,
                        value: match[1]
                    }
                ]).stack;
            return compiledToken;
        },
        parse() {
            return {
                chain: false,
                output: null
            };
        }
    };

    const endassetsToken = {
        type: 'endassets',
        regex: /^endassets$/,
        next: [],
        open: false
    };

    Twig.logic.extend(assetsToken);
    Twig.logic.extend(endassetsToken);
}

module.exports = extend;
