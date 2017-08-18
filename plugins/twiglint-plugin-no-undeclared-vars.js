'use strict';

const { addLineNumbers } = require('../lib/helpers');
const ruleId = 'no-undeclared-vars';

module.exports = function(root, filePath, config) {
    const severity = config.rules[ruleId];
    if (!severity) {
        return [];
    }
    const { variables, setVariables, forLoops, docBlockItems } = root;

    const usedButNotDeclared = variables.filter(singleToken => {
        let declared =
        // Есть ли переменная в установленных переменных
        setVariables.filter(singleValue => {
            return singleToken.value === singleValue.value;
        }).length ||
        // Или объявлена ли она в лупе
        forLoops.filter(singleValue => {
            return singleToken.value === singleValue.value_var;
        }).length ||
        // Или есть ли она в глобально настроенных переменных
        Object.keys(config.globals)
            .filter(singleGlobal => singleGlobal === singleToken.value).length ||
        // Или есть ли она в объявлениях в докблоке
        docBlockItems.filter(singleDeclaration => {
            return singleDeclaration.includes(singleToken.value);
        }).length;
        return !declared;
    });

    const errors = [
        {
            filePath,
            messages: addLineNumbers(usedButNotDeclared, root.rawData)
                .map(singleToken => ({
                    line: singleToken.lineNumber,
                    column: '0',
                    message: `"${singleToken.value}" used, but not declared`,
                    ruleId,
                    fatal: severity > 1,
                    severity
                }))
        }
    ];
    return errors;
};
