
/**
 * Module dependencies.
 */

var path = require('path');
var fs = require('fs');
var join = path.join;
var exists = fs.existsSync;
var mkdirp = require('mkdirp').sync;


/**
 * Output fatal error message and exit.
 *
 * @param {String} msg
 * @api private
 */

exports.fatal = function(){
  console.error();
  exports.error.apply(null, arguments);
  console.error();
  process.exit(1);
};

/**
 * Log the given `type` with `msg`.
 *
 * @param {String} type
 * @param {String} msg
 * @api public
 */

exports.log = function(type, msg, color){
  color = color || '36';
  var w = 10;
  var len = Math.max(0, w - type.length);
  var pad = Array(len + 1).join(' ');
  console.log('  \033[' + color + 'm%s\033[m : \033[90m%s\033[m', pad + type, msg);
};

/**
 * Log warning message with `type` and `msg`.
 *
 * @param {String} type
 * @param {String} msg
 * @api public
 */

exports.warn = function(type, msg){
  exports.log(type, msg, '33');
};

/**
 * Output error message.
 *
 * @param {String} msg
 * @api private
 */

exports.error = function(msg){
  var w = 10;
  var type = 'error';
  var len = Math.max(0, w - type.length);
  var pad = Array(len + 1).join(' ');
  console.error('  \033[31m%s\033[m : \033[90m%s\033[m', pad + type, msg);
};


/**
 * Verbose write.
 *
 * @param {String} path
 * @param {String} str
 * @api private
 */

exports.write = function(path, str) {
  if (exists(path)) {
    exports.warn('exists', path);
  } else {
    exports.log('create', path);
    fs.writeFileSync(path, str);
  }
};


/**
 * A better mkdirp
 * 
 * @api private
 */

exports.mkdir = function() {
  mkdirp(path.join.apply(path, arguments));
};