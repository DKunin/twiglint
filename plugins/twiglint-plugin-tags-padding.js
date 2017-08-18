'use strict';

const { addLineNumbers } = require('../lib/helpers');
const ruleId = 'tags-padding';

module.exports = function(root, filePath, config) {
    const severity = config.rules[ruleId];

    if (!severity) {
        return [];
    }
    const { rawData } = root;

    // Тэги со склеиными скобками
    let matches = (rawData.match(
        /\{[{|%|#][\w|.| ]+[^\s][}|%|#]\}/g
    ) || []);

    // Тэги с плавающими скобками
    const secondBatch = (rawData.match(
        /\{[{|%|#]\s{2,}[\w|.]+\s{2,}[}|%|#]\}/g
    ) || []);
    matches = matches.concat(secondBatch);

    const allMatches = matches.map(singleMatch => ({
        value: singleMatch
    }));

    const errors = [
        {
            filePath,
            messages: addLineNumbers(
                allMatches,
                root.rawData
            ).map(singleToken => ({
                line: singleToken.lineNumber,
                column: '0',
                message: 'use correct spacing between logic brackets',
                ruleId: 'tags-padding',
                fatal: true,
                severity: 1
            }))
        }
    ];
    return errors;
};
