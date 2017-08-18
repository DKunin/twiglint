'use strict';

const { addLineNumbers } = require('../lib/helpers');
const ruleId = 'no-spaceless';

module.exports = function(root, filePath, config) {
    const severity = config.rules[ruleId];
    if (!severity) {
        return [];
    }
    const { logicTokens } = root;
    const spacelessTokens = logicTokens.filter(({ token }) => {
        return token.type === 'Twig.logic.type.spaceless';
    });
    const errors = [
        {
            filePath,
            messages: addLineNumbers(
                spacelessTokens,
                root.rawData
            ).map(singleToken => ({
                line: singleToken.lineNumber,
                column: '0',
                message: 'refrain from use of "spaceless" tag, when possible',
                ruleId,
                fatal: severity > 1,
                severity
            }))
        }
    ];
    return errors;
};
