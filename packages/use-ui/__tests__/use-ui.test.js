'use strict';

const useUi = require('..');
const assert = require('assert').strict;

assert.strictEqual(useUi(), 'Hello from useUi');
console.info('useUi tests passed');
