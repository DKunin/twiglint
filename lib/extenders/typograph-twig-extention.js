'use strict';
function extend(Twig) {
    const typographToken = {
        type: 'typograph',
        regex: /^typograph(?:\s+(.+))?$/,
        next: ['endtypograph'],
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

    const endtypographToken = {
        type: 'endtypograph',
        regex: /^endtypograph$/,
        next: [],
        open: false
    };

    Twig.logic.extend(typographToken);
    Twig.logic.extend(endtypographToken);
}

module.exports = extend;
