'use strict';
function extend(Twig) {
    const jsToken = {
        type: 'js',
        regex: /^js(?:\s+(.+))?$/,
        next: ['endjs'],
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

    const endjsToken = {
        type: 'endjs',
        regex: /^endjs$/,
        next: [],
        open: false
    };

    Twig.logic.extend(jsToken);
    Twig.logic.extend(endjsToken);
}

module.exports = extend;
