/**
 * Module Dependencies
 */

var Facebook = require('facebook-oauth-agent');
var superagent = require('superagent');
var assign = require('object-assign');

/**
 * Export `facebook`
 */

module.exports = facebook;

/**
 * Defaults
 */

var defaults = {
  redirect_uri: window.location.origin || window.location.protocol + '//' + window.location.host,
  url: ''
};

/**
 * Facebook
 */

function facebook(options) {
  return function _facebook(fn) {
    options = assign(defaults, options);
    Facebook(options, function(err, code) {
      if (err) return fn(err);

      var obj = assign({
        code: code,
        client_id: options.client_id,
        client_secret: options.client_secret,
        redirect_uri: options.redirect_uri
      })

      superagent.post(options.url + '/auth/facebook')
        .send(obj)
        .end(function(err, res) {
          if (err) return fn(err);
          return fn(null, res.body || res.text);
        });
    })
  }
}
