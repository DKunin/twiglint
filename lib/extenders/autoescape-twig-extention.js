'use strict';
function extend(Twig) {
    const autoescapeToken = {
        type: 'autoescape',
        regex: /^autoescape(?:\s+(.+))?$/,
        next: ['endautoescape'],
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

    const endautoescapeToken = {
        type: 'endautoescape',
        regex: /^endautoescape$/,
        next: [],
        open: false
    };

    Twig.logic.extend(autoescapeToken);
    Twig.logic.extend(endautoescapeToken);
}

module.exports = extend;
