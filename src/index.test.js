/**
 * Created by Ari on 7/13/15.
 */
/*global mocha,sinon,chai,expect,should,AssertionError,it,describe*/
var rewire = require('rewire');

describe('index.js', function() {
  var loader;

  beforeEach(function() {
    loader = rewire('./index');
  });

  afterEach(function() {
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
           args = Array.prototype.slice.call(arguments);
           self = this;
           return returnValue;
         };

         var params = [{ item: 1 }, { item: 2 }, { item: 3 }];
         var result = loader.apply({ Loader: fakeLoader }, params);

         expect(params).to.be.eql(args);
         expect(self).to.be.eql({});
         expect(result).to.be.eql(returnValue);
       });

    it('should export package.json as pkg', function() {
      var pkg = require('../package');
      expect(loader.version).to.eql(pkg.version);
      expect(loader.author).to.eql(pkg.author);
    });

    describe('Loader', function() {
      describe('#_sortModules', function() {
        var self;
        beforeEach(function() {
          self = { modules: [] };
        });
        it('Should be a function', function() {
          expect(loader.Loader.prototype._sortModules).to.be.a('function');
        });
        it('Should sort this.modules by priority (and return this.modules)',
           function() {
             var numberOfModules = 4;
             for (var i = 0; i < numberOfModules; i++) {
               self.modules.push({ priority: i });
             }

             var result = loader.Loader.prototype._sortModules.apply(self);

             for (var I = 0; I < numberOfModules; I++) {
               expect(self.modules[I]).to.eql({ priority: I });
             }

             expect(result).to.eql(self.modules);
           });
      });
    });
  });
});