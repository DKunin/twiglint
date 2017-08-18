'use strict';

import test from 'ava';

import twiglint from '../../lib/twig';
import preferCamelCaseVars
    from '../../plugins/twiglint-plugin-prefer-camel-case-vars';
import twigLintConfig from '../../.twiglintrc';

const ruleId = 'prefer-camel-case-vars';
const fileNameWithErrors =
    `./test/${ruleId}/${ruleId}-errors.stub.twig`;
const fileNameWithoutErrors =
    `./test/${ruleId}/${ruleId}-no-errors.stub.twig`;

test('simple error', async t => {
    const errors = twiglint(fileNameWithErrors, {
        d: true,
        debug: true
    }).then(result => {
        return preferCamelCaseVars(result, fileNameWithErrors, twigLintConfig);
    });
    t.deepEqual(await errors, [
        {
            filePath: fileNameWithErrors,
            messages: [
                {
                    line: 1,
                    column: '0',
                    message: '"not_camelcase" is, not camelCase',
                    ruleId,
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
        return preferCamelCaseVars(result, fileNameWithoutErrors, twigLintConfig);
    });
    t.deepEqual(await errors, [
        {
            filePath: fileNameWithoutErrors,
            messages: []
        }
    ]);
});
