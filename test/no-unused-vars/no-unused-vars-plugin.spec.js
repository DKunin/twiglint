'use strict';

import test from 'ava';

import twiglint from '../../lib/twig';
import noUnusedVars from '../../plugins/twiglint-plugin-no-unused-vars';
import twigLintConfig from '../../.twiglintrc';

const ruleId = 'no-unused-vars';
const fileNameWithErrors =
    `./test/${ruleId}/${ruleId}-errors.stub.twig`;
const fileNameWithoutErrors =
    `./test/${ruleId}/${ruleId}-no-errors.stub.twig`;

test('simple error', async t => {
    const errors = twiglint(fileNameWithErrors, {
        d: true,
        debug: true
    }).then(result => {
        return noUnusedVars(result, fileNameWithErrors, twigLintConfig);
    });
    t.deepEqual(await errors, [
        {
            filePath: fileNameWithErrors,
            messages: [
                {
                    line: 1,
                    column: '0',
                    message: '"someVar" variable declared, but never used',
                    ruleId,
                    fatal: true,
                    severity: 2
                }
            ]
        }
    ]);
});

test('no errors', async t => {
    const errors = twiglint(fileNameWithoutErrors, {
        d: true,
        debug: true
    }).then(result => {
        return noUnusedVars(result, fileNameWithoutErrors, twigLintConfig);
    });
    t.deepEqual(await errors, [
        {
            filePath: fileNameWithoutErrors,
            messages: []
        }
    ]);
});
