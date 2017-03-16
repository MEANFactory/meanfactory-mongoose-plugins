var plugins = {};

try {
    plugins['audittrail']   = require('mf-mongoose-audittrail');
} catch (e) { }

try {
    plugins['dto']          = require('mf-mongoose-dto');
} catch (e) { }

try {
    plugins['softdelete']   = require('mf-mongoose-softdelete');
} catch (e) { }

try {
    plugins['validation']   = require('mf-mongoose-validation');
} catch (e) { }

module.exports = plugins;
