'use strict';

const { addLineNumbers } = require('../lib/helpers');
const regext = /_|-|\s/g;

const ruleId = 'prefer-camel-case-vars';

function findNonCamelCase(singleVariable) {
    return (singleVariable.key || singleVariable.value).match(regext);
}

module.exports = function(root, filePath, config) {
    const severity = config.rules[ruleId];

    if (!severity) {
        return [];
    }
    const { variables, setVariables } = root;

    let wrongNames = [];
    wrongNames = variables.filter(findNonCamelCase);
    wrongNames = wrongNames.concat(setVariables.filter(findNonCamelCase));

    const errors = [
        {
            filePath,
            messages: addLineNumbers(wrongNames, root.rawData)
                .map(singleToken => ({
                    line: singleToken.lineNumber,
                    column: '0',
                    message: `"${singleToken.value}" is, not camelCase`,
                    ruleId,
                    fatal: severity > 1,
                    severity
                }))
        }
    ];
    return errors;
};
