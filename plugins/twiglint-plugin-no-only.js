'use strict';

const { addLineNumbers } = require('../lib/helpers');

const ruleId = 'no-only';

module.exports = function(root, filePath, config) {
    const severity = config.rules[ruleId];
    if (!severity) {
        return [];
    }
    const includes = root.logicTokens
        .filter(singleToken => {
            return singleToken.token.type === 'Twig.logic.type.include';
        });
    const errors = [
        {
            filePath,
            messages: addLineNumbers(includes, root.rawData)
                .filter(singleInclude => !singleInclude.token.only)
                .map(singleInclude => ({
                    line: singleInclude.lineNumber,
                    column: '0',
                    message: 'Use only to reduce amount of variables inside of template',
                    ruleId,
                    fatal: severity > 1,
                    severity
                }))
        }
    ];
    return errors;
};
