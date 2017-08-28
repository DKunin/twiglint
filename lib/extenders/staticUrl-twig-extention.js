'use strict';
function extend(Twig) {
    const typographToken = {
        type: 'staticUrl',
        regex: /^staticUrl(?:(.+))?$/,
        next: [],
        open: true,
        compile(token) {
            const compiledToken = token;
            const match = token.match;
            // Hack to ignore "variables" after staticUrl
            token.match[0] = token.match[0].replace('relative', '');
            token.match[1] = token.match[1].replace('relative', '');
            compiledToken.stack = match[1] == null ?
                [] :
                Twig.expression.compile.apply(this, [
                    {
                        type: Twig.expression.type.expression,
                        value: match[1]
                    }
                ]).stack;
            delete token.match;
            return compiledToken;
        },
        parse() {
            return {
                chain: false,
                output: null
            };
        }
    };

    const typographToken2 = {
        type: 'constant',
        regex: /^constant(?:(.+))?$/,
        next: [],
        open: true,
        compile(token) {
            const compiledToken = token;
            const match = token.match;
            // Hack to ignore "variables" after staticUrl
            token.match[0] = token.match[0].replace('relative', '');
            token.match[1] = token.match[1].replace('relative', '');
            compiledToken.stack = match[1] == null ?
                [] :
                Twig.expression.compile.apply(this, [
                    {
                        type: Twig.expression.type.expression,
                        value: match[1]
                    }
                ]).stack;
            delete token.match;
            return compiledToken;
        },
        parse() {
            return {
                chain: false,
                output: null
            };
        }
    };

    Twig.logic.extend(typographToken);
    Twig.logic.extend(typographToken2);
}

module.exports = extend;
