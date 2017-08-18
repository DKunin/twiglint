'use strict';

const stylish = require('./stylish');

module.exports = function(results) {
    var files = {};

    results.forEach(result => {
        if (!files[result.filePath]) {
            files[result.filePath] = {
                filePath: result.filePath,
                errorCount: 0,
                warningCount: 0,
                messages: []
            };
        }
        var file = files[result.filePath];

        result.messages.forEach(message => {
            file.errorCount += Number(message.fatal);
            file.warningCount += Number(!message.fatal);
            file.messages.push(message);
        });
    });

    var toArray = Object.keys(files)
        .map(file => {
            var res = files[file];
            res.messages = res.messages.sort((a, b) => a.line - b.line);
            return res;
        });
    return stylish(toArray);
};
