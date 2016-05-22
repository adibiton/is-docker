'use strict';
const fs = require('fs');

module.exports = function () {
    try {
        fs.statSync('/.dockerenv');
        return true;
    } catch (e) {
        return false;
    }
}