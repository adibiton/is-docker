'use strict';
import test from 'ava';
import path from 'path';
import sinon from 'sinon';
import fs from 'fs';

test('inside a Docker container', t => {
    delete require.cache[path.join(__dirname, '../index.js')];
    const isDocker = require('./');
    fs.statSync = sinon.stub(fs, 'statSync');
    fs.statSync.withArgs('/.dockerenv').returns({});
    t.true(isDocker());
    fs.statSync.restore();
});

test('not inside a Docker container', t => {
    delete require.cache[path.join(__dirname, '../index.js')];
    const isDocker = require('./');
    fs.statSync = sinon.stub(fs, 'statSync');
    fs.statSync.withArgs('/.dockerenv').throws('Exception, no such file or directory \'.dockerinit\'');
    t.false(isDocker());
    fs.statSync.restore();

});