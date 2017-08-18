'use strict';

/**
 * Returns the severity of warning or error
 * @param {Object} message message object to examine
 * @returns {string} severity level
 * @private
 */
function getMessageType(message) {
    if (message.fatal || message.severity === 2) {
        return 'Error';
    }
    return 'Warning';
}

module.exports = function(results) {
    let output = '', total = 0;

    results.filter(result => result.messages && result.messages.length).forEach(result => {
        const messages = result.messages;

        total += messages.length;

        messages.forEach(message => {
            output += `${result.filePath}:${message.line || 0}`;
            output += `, ${getMessageType(message)}`;
            output += ` - ${message.message}`;
            output += message.ruleId ? ` (${message.ruleId})` : '';
            output += '\n';
        });
    });

    if (total > 0) {
        output += `\n${total} problem${total !== 1 ? 's' : ''}`;
    }

    return output;
};
