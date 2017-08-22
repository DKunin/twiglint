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
