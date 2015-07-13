/**
 * Created by Ari on 7/13/15.
 */

var sinon = global.sinon = require('sinon');
var chai = global.chai = require('chai');
var expect = global.expect = chai.expect;
var AssertionError = global.AssertionError = chai.AssertionError;

chai.should();

chai.use(require('sinon-chai'));

console.log('Done with common');
require('./test.coverage');

//
// Code Coverage
//

var ignorePatterns = [
  /.test.js$/,
  /test./,
  /\/node_modules\//
];

require('blanket')({
  pattern: function (filename) {
    var ignore = false;

    if (!/src\//.test(filename)) {
      ignore = true;
    }

    ignorePatterns.forEach(function shouldIgnore(pattern) {
      if (pattern.test(filename)) {
        ignore = true;
      }
    });

    return !ignore;
  }
});