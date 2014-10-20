// Generated by CoffeeScript 1.8.0
var CozyInstance, router;

CozyInstance = require('../models/instance');

router = require('../lib/router');

module.exports.webfingerHostMeta = function(req, res) {
  if (req.params.ext !== 'json') {
    return res.send(404);
  }
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Allow-Methods', 'GET');
  return CozyInstance.first(function(err, instance) {
    var host, hostmeta, template;
    if (err) {
      return next(err);
    }
    if (!(instance != null ? instance.domain : void 0)) {
      return next(new Error('no instance'));
    }
    host = 'https://' + instance.domain;
    template = "" + host + "/webfinger/json?resource={uri}";
    hostmeta = {
      links: {
        rel: 'lrdd',
        template: template
      }
    };
    return res.send(200, hostmeta);
  });
};

module.exports.webfingerAccount = function(req, res, next) {
  var OAUTH_VERSION, PROTOCOL_VERSION, accountInfo, host, link, routes, _ref;
  CozyInstance.first(function(err, instance) {
    if (err != null) {
      return next(err);
    }
    if (!(instance != null ? instance.domain : void 0)) {
      return next(new Error('no instance'));
    }
  });
  if ((_ref = req.params.module) === 'caldav' || _ref === 'carddav') {
    routes = router.getRoutes();
    console.log(routes);
    return res.redirect("https://" + instance.domain + "/public/sync/");
  } else if (req.params.module === 'webfinger') {
    host = 'https://' + instance.domain;
    OAUTH_VERSION = 'http://tools.ietf.org/html/rfc6749#section-4.2';
    PROTOCOL_VERSION = 'draft-dejong-remotestorage-01';
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Methods', 'GET');
    accountInfo = {
      links: []
    };
    routes = require('../lib/router').getRoutes();
    if (routes['remotestorage']) {
      link = {
        href: "" + host + "/public/remotestorage/storage",
        rel: 'remotestorage',
        type: PROTOCOL_VERSION,
        properties: {
          'auth-method': OAUTH_VERSION,
          'auth-endpoint': "" + host + "/apps/remotestorage/oauth/"
        }
      };
      link.properties[OAUTH_VERSION] = link.properties['auth-endpoint'];
      accountInfo.links.push(link);
    }
    return res.send(200, accountInfo);
  } else {
    return res.send(404);
  }
};
