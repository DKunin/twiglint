'use strict';

const fs = require('fs');
const path = require('path');
const tokenizer2 = require('tokenizer2');

module.exports = function(fileName) {
    return new Promise((resolve, reject) => {
        fs.readFile(path.resolve(fileName), (err) => {
            if (err) {
                reject(err);
                return;
            }
            const tokenStream = tokenizer2();

            tokenStream.addRule(/^[ ]+$/, 'whitespace');
            tokenStream.addRule(/^[\n]+$/, 'newline');
            tokenStream.addRule(/^\{%$/, 'startlogic');
            tokenStream.addRule(/^%\}$/, 'endlogic');

            // tokenStream.addRule(/^block$/, 'startblock');
            // tokenStream.addRule(/^endblock$/, 'endblock');

            tokenStream.addRule(/^(\w+)$|^"([^"]|\\")*"$/, 'word');
            tokenStream.addRule(/^[-+]?[0-9]+\.?[0-9]*$/, 'number');
            tokenStream.addRule(/^[^"0-9\s][^\s]*$/, 'symbol');

            // const rawData = result.toString();
            let newTokenLine = [];
            // write some info to the console
            let logicBlocks = [];
            let currentBlock = null;
            let currentBlockObject = {};
            tokenStream.on('data', token => {
                newTokenLine.push(token);
                if (token.type === 'startlogic' && currentBlock === null) {
                    currentBlock = Math.random() * Date.now();
                    currentBlockObject = {
                        name: 'logic',
                        id: currentBlock,
                        src: '',
                        line: token.line,
                        col: token.col
                    };
                }
                if (token.type !== 'endlogic' && currentBlock) {
                    currentBlockObject.src += token.src;
                }

                if (token.type === 'endlogic' && currentBlock) {
                    currentBlockObject.src += token.src;
                    logicBlocks.push(currentBlockObject);
                    currentBlockObject = {};
                    currentBlock = null;
                }
            });
            tokenStream.on('end', () => {
                resolve({
                    logicBlocks
                    // ,
                    // rawData,
                    // newTokenLine
                });
            });

            fs.createReadStream(fileName).pipe(tokenStream);
        });
    });
};
