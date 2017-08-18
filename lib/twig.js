'use strict';

const fs = require('fs');
const path = require('path');
const twig = require('twig-ast');

const twigAssets = require('./extenders/assets-twig-extention');
const twigTypograph = require('./extenders/typograph-twig-extention');
const twigStaticUrl = require('./extenders/staticUrl-twig-extention');
const twigJS = require('./extenders/js-twig-extention');

const { findValues, getType } = require('./helpers');

twig.extend(twigAssets);
twig.extend(twigTypograph);
twig.extend(twigStaticUrl);
twig.extend(twigJS);

module.exports = function(fileName, flags) {
    return new Promise((resolve, reject) => {
        fs.readFile(path.resolve(fileName), (err, result) => {
            if (err) {
                reject(err);
                return;
            }
            const rawData = result.toString();
            const parsedData = twig.twig({ data: rawData });
            const docBlockParts = rawData.match(/{#([^#]+)?#}/gm) || [];
            const docBlockItems = docBlockParts
                .map(singleEntry => {
                    return singleEntry.match(/@param[^\n#]+/g);
                })
                .reduce((newParamsArray, singleParam) => {
                    return newParamsArray.concat(singleParam);
                }, [])
                .filter(Boolean);

            if (flags.debug) {
                fs.writeFileSync(
                    '/tmp/mock.json',
                    JSON.stringify(parsedData, null, 4)
                );
            }
            // Token Types
            const allTokensWithType = findValues(parsedData.tokens, 'type');
            const logicTokens = allTokensWithType.filter(getType('logic'));
            const rawTokens = allTokensWithType.filter(getType('raw'));
            const outputsTokens = allTokensWithType.filter(getType('output'));
            const variables = allTokensWithType.filter(
                getType('Twig.expression.type.variable')
            );
            const setVariables = allTokensWithType
                .filter(getType('Twig.logic.type.set'))
                .concat(
                    allTokensWithType.filter(
                        getType('Twig.logic.type.setcapture')
                    )
                );
            const forLoops = allTokensWithType.filter(
                getType('Twig.logic.type.for')
            );

            resolve({
                parsedData,
                rawData,
                forLoops,
                logicTokens,
                rawTokens,
                docBlockItems,
                setVariables,
                variables,
                outputsTokens
            });
        });
    });
};
