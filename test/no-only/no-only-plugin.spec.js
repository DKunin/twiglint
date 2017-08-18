'use strict';

import test from 'ava';

import twiglint from '../../lib/twig';
import noOnlyWarningPlugin from '../../plugins/twiglint-plugin-no-only';
import twigLintConfig from '../../.twiglintrc';

const ruleId = 'no-only';
const fileNameWithErrors = `./test/${ruleId}/${ruleId}-plugin-errors.stub.twig`;
const fileNameWithoutErrors = `./test/${ruleId}/${ruleId}-plugin-no-errors.stub.twig`;

test('simple error on no only', async t => {
    const errors = twiglint(fileNameWithErrors, { d: true, debug: true }).then(result => {
        return noOnlyWarningPlugin(result, fileNameWithErrors, twigLintConfig);
    });
    t.deepEqual(
        await errors,
        [
            {
                filePath: fileNameWithErrors,
                messages: [
                    {
                        line: 7,
                        column: '0',
                        message: 'Use only to reduce amount of variables inside of template',
                        ruleId,
                        fatal: false,
                        severity: 1
                    }
                ]
            }
        ]
    );
});

test('correctly no errors', async t => {
    const errors = twiglint(fileNameWithoutErrors, { d: true, debug: true }).then(result => {
        return noOnlyWarningPlugin(result, fileNameWithoutErrors, twigLintConfig);
    });
    t.deepEqual(
        await errors,
        [
            {
                filePath: fileNameWithoutErrors,
                messages: []
            }
        ]
    );
});
