/**
 * Created by Ari on 7/13/15.
 */
/*global mocha,sinon,chai,expect,should,AssertionError,it,describe*/
var sandbox = sinon.sandbox.create;
var rewire = require('rewire');

describe('index.js', function() {
  var sinon;
  var loader;

  beforeEach(function() {
    loader = rewire('./index');
    sinon = sandbox();
  });

  afterEach(function() {
    sinon.restore();
  });

  describe('module.exports', function() {
    it('should be a function', function() {
      expect(loader).to.be.a('function');
    });

    it('should pass all arguments to module.exports.Loader (and return the result)',
       function() {
         var args;
         var self;
         var returnValue = { isReturn: true };

         var fakeLoader = function() {
           args = Array.prototype.slice(arguments);
           self = this;
           return returnValue;
         };

         var params = [{ item: 1 }, { item: 2 }, { item: 3 }];
         var result = loader.apply({ Loader: fakeLoader }, params);

         expect(params).to.be.eq(args);
         expect(self).to.be.eql({});
         expect(result).to.be.eq(returnValue);
       });

    it('should export package.json as pkg', function() {
      expect(loader.pkg).to.eql(require('../package'));
    });
  });
});