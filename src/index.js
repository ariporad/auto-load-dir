/**
 * Created by Ari Porad on 7/13/15.
 */

var walk = require('findit');

module.exports = function loadRoutes(dir, args, callback) {
  return new this.Loader(dir, args, callback);
};

module.exports.Loader = function(dir, args, callback) {
  this.modules = [];
  this.dir = dir;
  this.cb = callback || function() {};

  if (typeof args == 'function') {
    this.handler = args;
  } else if (args instanceof Array) {
    this.args = args;
    this.handler = function(module) { return module.apply(this, this.args); };
  }

  if (!this.dir && !this.handler) {
    throw new Error('You must pass in a dir and a list of arguments/a handler' +
                    ' function');
  }

  this._setupWalker();
  return this;
};

module.exports.Loader.prototype._setupWalker = function() {
  try {
    this.walker = walk(dir);
    this.walker.on('file', function(file, stat) {
      try {
        this._processFilename(file, stat);
      } catch (err) {
        this.cb(err);
      }
    });

    this.walker.on('end', function() {
      try {
        this._processModules();
      } catch (err) {
        this.cb(err);
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
