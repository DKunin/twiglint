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
