/**
 * Created by Ari Porad on 7/13/15.
 */

var walk = require('findit');

module.exports = function Loader(dir, args, callback) {
  if (Object.keys(this).length != 0) return new Loader(dir, args, callback);
  this.modules = [];
  this.dir = dir;
  this.cb = callback || function() {};

  if (typeof args == 'function') {
    this.handler = args;
  } else if (args instanceof Array) {
    this.args = args;
    this.handler = function(module) {
      if (typeof module != 'function') return;
      return module.apply(this, this.args);
    };
  }

  if (!this.dir || !this.handler) {
    throw new Error('You must pass in a dir and a list of arguments/a handler' +
                    ' function');
  }

  this._setupWalker();
  return this;
};

module.exports.Loader = module.exports;

module.exports.Loader.prototype._setupWalker = function() {
  try {
    var self = this;
    this.walker = walk(this.dir);
    this.walker.on('file', function(file, stat) {
      try {
        self._processFilename(file, stat);
      } catch (err) {
        self.cb(err);
      }
    });

    this.walker.on('end', function() {
      try {
        self._processModules();
      } catch (err) {
        self.cb(err);
      }
    });

    this.walker.on('error', this.cb);
  } catch (err) {
    this.cb(err);
  }
};

module.exports.Loader.prototype._sortModules = function() {
  this.modules = this.modules.sort(function(a, b) {
    return (a.priority || 0) - (b.priority || 0);
  });

  return this.modules;
};

module.exports.Loader.prototype._processModules = function() {
  this._sortModules();
  for (var i = 0; i < this.modules.length; i++) {
    this.handler(this.modules[i]);
  }
  (this.cb || function() {})();
};

module.exports.Loader.prototype._processFilename = function(file, stat) {
  var parts = file.split('.');
  if (parts[parts.length - 1] === 'js') {
    this.modules.push(require(file));
  }
};

require('pkginfo')(module);
