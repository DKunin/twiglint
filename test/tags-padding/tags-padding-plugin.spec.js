'use strict';

import test from 'ava';

import twiglint from '../../lib/twig';
import noUndeclaredVars from '../../plugins/twiglint-plugin-tags-padding';
import twigLintConfig from '../../.twiglintrc';
const ruleId = 'tags-padding';

const fileNameWithErrors = `./test/${ruleId}/${ruleId}-errors.stub.twig`;
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
                    line: 1,
                    column: '0',
                    message: 'use correct spacing between logic brackets',
                    ruleId: 'tags-padding',
                    fatal: true,
                    severity: 1
                },
                {
                    line: 4,
                    column: '0',
                    message: 'use correct spacing between logic brackets',
                    ruleId: 'tags-padding',
                    fatal: true,
                    severity: 1
                },
                {
                    line: 6,
                    column: '0',
                    message: 'use correct spacing between logic brackets',
                    ruleId: 'tags-padding',
                    fatal: true,
                    severity: 1
                },
                {
                    line: 7,
                    column: '0',
                    message: 'use correct spacing between logic brackets',
                    ruleId: 'tags-padding',
                    fatal: true,
                    severity: 1
                },
                {
                    line: 10,
                    column: '0',
                    message: 'use correct spacing between logic brackets',
                    ruleId: 'tags-padding',
                    fatal: true,
                    severity: 1
                },
                {
                    line: 3,
                    column: '0',
                    message: 'use correct spacing between logic brackets',
                    ruleId: 'tags-padding',
                    fatal: true,
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
