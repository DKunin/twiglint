'use strict';

import test from 'ava';
import { exec } from 'child_process';
import util from 'util';
const promiseExec = util.promisify(exec);

test('cli error', async t => {
    const errors = promiseExec('./index.js ./test/cli/cli-escaped-quotes.twig');

    t.deepEqual(await errors, {
        stdout: '\n./test/cli/cli-escaped-quotes.twig\n  2:0  warning  "title" used, but not declared  no-undeclared-vars\n\n✖ 1 problem (0 errors, 1 warning)\n\n',
        stderr: ''
    });
});

test('cli parse error ', async t => {
    const errors = promiseExec('./index.js ./test/cli/cli-parser-error.twig');

    t.deepEqual(await errors, {
        stdout: '\n./test/cli/cli-parser-error.twig\n  1:0  error    "br" is a self closing tag and should not be closed explicitly  no-closed-self-closing-tags\n  2:0  warning  "key" used, but not declared                                    no-undeclared-vars\n  3:0  warning  "category" used, but not declared                               no-undeclared-vars\n\n✖ 3 problems (1 error, 2 warnings)\n\n',
        stderr: ''
    });
});

test('cli only without with ', async t => {
    const errors = promiseExec(
        './index.js ./test/cli/cli-variable-follow.twig'
    );

    t.deepEqual(await errors, {
        stdout: '\n./test/cli/cli-variable-follow.twig\n  1:0  warning  Use only to reduce amount of variables inside of template  no-only\n  1:0  warning  "only" used, but not declared                              no-undeclared-vars\n\n✖ 2 problems (0 errors, 2 warnings)\n\n',
        stderr: ''
    });
});

// test('cli constants parse', async t => {
//     const errors = promiseExec(
//         './index.js ./test/cli/cli-constants-parse.twig'
//     );
//     t.deepEqual(await errors, {});
// });

// test('parser error 2', async t => {
//     const errors = promiseExec(
//         './index.js ./test/cli/cli-parser-error-2.twig'
//     );
//     // errors.then(res => console.log(JSON.stringify(res)));
//     t.deepEqual(await errors, {});
// });

test('cli-array-include-error', async t => {
    const errors = promiseExec(
        './index.js ./test/cli/cli-array-include-error.twig'
    );
    // errors.then(res => console.log(JSON.stringify(res, null, 4)));
    t.deepEqual(await errors, {
        stdout: '\n./test/cli/cli-array-include-error.twig\n  1:0  warning  Use only to reduce amount of variables inside of template  no-only\n  1:0  warning  "i" used, but not declared                                 no-undeclared-vars\n  2:0  warning  "i" used, but not declared                                 no-undeclared-vars\n  2:0  warning  "i" used, but not declared                                 no-undeclared-vars\n\n✖ 4 problems (0 errors, 4 warnings)\n\n',
        stderr: ''
    });
});

test('trans protocol', async t => {
    const errors = promiseExec('./index.js ./test/cli/cli-trans.twig');
    // errors.then(res => console.log(JSON.stringify(res)));
    t.deepEqual(await errors, { stdout: '\n', stderr: '' });
});
