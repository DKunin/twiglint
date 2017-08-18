'use strict';

import test from 'ava';

import twiglint from '../../lib/twig';
import noUndeclaredVars
    from '../../plugins/twiglint-plugin-no-spaceless';
import twigLintConfig from '../../.twiglintrc';

const ruleId = 'no-spaceless';
const fileNameWithErrors =
    `./test/${ruleId}/${ruleId}-errors.stub.twig`;
const fileNameWithoutErrors =
    `./test/${ruleId}/${ruleId}-no-errors.stub.twig`;

test('simple error', async t => {
    const errors = twiglint(fileNameWithErrors, {
        d: true,
        debug: true
    }).then(result => {
        return noUndeclaredVars(result, fileNameWithErrors, twigLintConfig);
    });
    t.deepEqual(await errors, [
        {
            filePath: fileNameWithErrors,
            messages: [
                {
                    line: 3,
                    column: '0',
                    message: 'refrain from use of "spaceless" tag, when possible',
                    ruleId: 'no-spaceless',
                    fatal: false,
                    severity: 1
                }
            ]
        }
    ]);
});

test('correctly no errors', async t => {
    const errors = twiglint(fileNameWithoutErrors, {
        d: true,
        debug: true
    }).then(result => {
        return noUndeclaredVars(result, fileNameWithoutErrors, twigLintConfig);
    });
    t.deepEqual(await errors, [
        {
            filePath: fileNameWithoutErrors,
            messages: []
        }
    ]);
});
