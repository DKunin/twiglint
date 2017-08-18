'use strict';

const { addLineNumbers } = require('../lib/helpers');
const ruleId = 'no-unused-vars';

module.exports = function(root, filePath, config) {
    const severity = config.rules[ruleId];

    if (!severity) {
        return [];
    }
    const { variables, setVariables } = root;
    const declaredButNotUsed = setVariables.filter(singleToken => {
        return !variables.some(singleValue => {
            return singleToken.value === singleValue.value;
        });
    });

    const errors = [
        {
            filePath,
            messages: addLineNumbers(declaredButNotUsed, root.rawData)
                .map(singleToken => ({
                    line: singleToken.lineNumber,
                    column: '0',
                    message: `"${singleToken.value}" variable declared, but never used`,
                    ruleId,
                    fatal: severity > 1,
                    severity
                }))
        }
    ];
    return errors;
};
