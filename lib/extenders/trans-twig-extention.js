'use strict';
function extend(Twig) {
    const transToken = {
        type: 'trans',
        regex: /^trans(?:\s+(.+))?$/,
        next: [],
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

    Twig.logic.extend(transToken);
}

module.exports = extend;
