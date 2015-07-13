/**
 * Created by Ari Porad on 7/13/15.
 */

var walk = require('findit');

module.exports = function loadRoutes(dir, args, callback) {
  return new this.Loader(dir, args, callback);
};

module.exports.Loader = function (dir, args, callback) {
  try {
    this.modules = [];
    this.handler = function(module) { return module.apply(this, arg); };

    if (typeof dir ===
        'object' && !callback &&
        (!args || typeof args == 'function')) {
      var options = dir;
      this.dir = options.dir;
      this.args = options.args;
      this.handler = options.handler || this.handler;
      this.cb = options.callback || options.cb || args;
    } else if (typeof args == 'function') {
      this.handler = args;
      this.dir = dir;
      this.cb = callback;
    }

    this.walker = walk(dir);
    this.walker.on('file', function (file, stat) {
      try {
        this._processFilename(file, stat);
      } catch (err) {
        (this.cb || function() {})(err);
      }
      });

    this.walker.on('end', function() {
      try {
        this._processModules(modules, app, express);
      } catch (err) {
        (this.cb || function() {})(err);
      }
      });
  } catch (err) {
    (this.cb || callback || function (){})(err);
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
    modules.push(require(file));
  }
};

require('pkginfo')(module);
