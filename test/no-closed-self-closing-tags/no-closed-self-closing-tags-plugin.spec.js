'use strict';

import test from 'ava';

import twiglint from '../../lib/twig';
import noSelfClosedTagsPlugin
    from '../../plugins/twiglint-plugin-no-closed-self-closing-tags';
import twigLintConfig from '../../.twiglintrc';

const ruleId = 'no-closed-self-closing-tags';
const fileNameWithErrors =
    `./test/${ruleId}/${ruleId}-errors.stub.twig`;
const fileNameWithoutErrors =
    `./test/${ruleId}/${ruleId}-no-errors.stub.twig`;

test('simple error on closed self closing closed tag', async t => {
    const errors = twiglint(fileNameWithErrors, {
        d: true,
        debug: true
    }).then(result => {
        return noSelfClosedTagsPlugin(result, fileNameWithErrors, twigLintConfig);
    });
    t.deepEqual(await errors, [
        {
            filePath: fileNameWithErrors,
            messages: [
                {
                    line: 1,
                    column: '0',
                    message: '"img" is a self closing tag and should not be closed explicitly',
                    ruleId,
                    fatal: true,
                    severity: 2
                },
                {
                    line: 2,
                    column: '0',
                    message: '"input" is a self closing tag and should not be closed explicitly',
                    ruleId,
                    fatal: true,
                    severity: 2
                },
                {
                    line: 4,
                    column: '0',
                    message: '"br" is a self closing tag and should not be closed explicitly',
                    ruleId,
                    fatal: true,
                    severity: 2
                },
                {
                    line: 6,
                    column: '0',
                    message: '"link" is a self closing tag and should not be closed explicitly',
                    ruleId,
                    fatal: true,
                    severity: 2
                },
                {
                    line: 7,
                    column: '0',
                    message: '"meta" is a self closing tag and should not be closed explicitly',
                    ruleId,
                    fatal: true,
                    severity: 2
                }
            ]
        }
    ]);
});

test('no error on closed self closing closed tag', async t => {
    const errors = twiglint(fileNameWithoutErrors, {
        d: true,
        debug: true
    }).then(result => {
        return noSelfClosedTagsPlugin(result, fileNameWithoutErrors, twigLintConfig);
    });
    t.deepEqual(await errors, [
        {
            filePath: fileNameWithoutErrors,
            messages: []
        }
    ]);
});
