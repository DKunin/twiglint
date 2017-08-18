'use strict';

const { addLineNumbers } = require('../lib/helpers');

const ruleId = 'no-closed-self-closing-tags';

module.exports = function(root, filePath, config) {
    const { rawData } = root;
    const severity = config.rules[ruleId];
    if (!severity) {
        return [];
    }
    const matches = (rawData.match(
        /<(input|img|br|link|meta|param|source|embed|hr)(.+)?[^]\/>/g
    ) || []).map(singleMatch => ({
        value: singleMatch,
        tagName: singleMatch.match(/(input|img|br|link|meta|param|source|embed|hr)/g)[0]
    }));

    const errors = [
        {
            filePath,
            messages: addLineNumbers(
                matches,
                root.rawData
            ).map(singleToken => ({
                line: singleToken.lineNumber,
                column: '0',
                message: `"${singleToken.tagName}" is a self closing tag and should not be closed explicitly`,
                ruleId,
                fatal: severity > 1,
                severity
            }))
        }
    ];
    return errors;
};
