'use strict';

/**
 * Вычисление строчки по строчке
 * @param {string} substring
 * @param {string} string
 * @return {number}
 */
function locations(substring, string) {
    const a = [];
    let i = -1;
    while ((i = string.indexOf(substring, i + 1)) >= 0) {
        a.push(i);
    }
    return a;
}

function head(array) {
    return array[0];
}

function addLineNumbers(array, wholeData) {
    const usedIncludes = new Set();

    return array.map(singleToken => {
        const value = singleToken.value || head(singleToken.token.stack || singleToken.token.output).value;
        const matches = locations(value, wholeData).filter(
            singleMatch => !usedIncludes.has(singleMatch)
        );
        usedIncludes.add(head(matches));
        const lineNumber = wholeData.substring(0, head(matches)).split('\n')
            .length;
        return Object.assign(singleToken, { lineNumber });
    });
}

function findValues(obj, key) {
    return findValuesHelper(obj, key, []);
}

function findValuesHelper(obj, key, list) {
    if (!obj) {
        return list;
    }

    if (obj instanceof Array) {
        for (var i in obj) {
            list = list.concat(findValuesHelper(obj[i], key, []));
        }
        return list;
    }
    if (obj[key]) {
        list.push(Object.assign(obj, { value: obj.key || obj.value }));
    }

    if (typeof obj == 'object' && obj !== null) {
        var children = Object.keys(obj);
        if (children.length > 0) {
            for (i = 0; i < children.length; i++) {
                list = list.concat(findValuesHelper(obj[children[i]], key, []));
            }
        }
    }
    return list;
}

function getType(typeToGet) {
    return ({ type }) => {
        return type === typeToGet;
    };
}

module.exports = {
    getType,
    addLineNumbers,
    findValues
};
