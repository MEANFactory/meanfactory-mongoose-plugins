# mf-mongoose-plugins
Helper project to instantiate any of the installed mf-mongoose plugins.

## Installation ##

    npm install --save mf-mongoose-plugins

## Usage ##
Note the `mf` variable below.  This one call replaces the need to specify a separate `require()` statement for each of the plugins;
```
var $           = require('mf-utils.node'),
    config      = require('../../../config'),
    enums       = require('../enums'),
    mf         = require('mf-mongoose-plugins'),
    mongoose 	= require('mongoose'),

var maxYear = (new Date()).getFullYear();

var personSchema = new mongoose.Schema({

    _id : { type: String, default: $.uuids.init },

    s   : { type: String, name: 'SSN', required: true, trim: true, hide: '< 30', minLength: 9, maxLength: 9, validChars: '0123456789' },

    p	: { type: String, name: 'Name Prefix', key: 'name.prefix', enum: enums.NAME_PREFIX.ids },
    f	: { type: String, name: 'First Name', key: 'name.first', trim: true, required: true, minLength: 2, maxLength: 50 },
    m	: { type: String, name: 'Middle Name', key: 'name.first', trim: true, minLength: 2, maxLength: 50 },
    l	: { type: String, name: 'Last Name', key: 'name.first', trim: true, required: false, minLength: 2, maxLength: 50 },
    p	: { type: String, name: 'Name Suffix', key: 'name.suffix', enum: enums.NAME_SUFFIX.ids },

    bm  : { type: Number, name: 'Birth Month', key: 'dob.month', min: 1, max: 12 }
    bd  : { type: Number, name: 'Birth Day', key: 'dob.day', min: 1, max: 31 }
    by  : { type: Number, name: 'Birth Year', key: 'dob.year', min: 1900, max: maxYear }

    // ac  : { type: Date, required: true },           // Created Date
    // au  : { type: Date },                           // Updated Date
    // ad  : { type: Date },                           // Deleted Date
    // am  : { type: String, required: true }          // Audit Member
});

// PLUGINS ---------------------------------------------------------------------
personSchema.plugin(mf.audittrail, {
    created: {
        hide : '< ' + USER
    }
    updated: {
        hide : '< ' + USER
    }
    member: {
        uuid     : 'uid',
        show    : '>= ' + USER
    }
});
personSchema.plugin(mf.dto);
personSchema.plugin(mf.softdelete);
personSchema.plugin(mf.vaidate);

// INDICES ---------------------------------------------------------------------

personSchema.index({
    s  : 1,
    ad : 1
}, { unique: true });

module.exports = mongoose.model('Person', personSchema);
```

## Related Projects ##
The following projects have been designed specifically to work with each other:

### [mf-mongoose-audittrail](https://github.com/MEANFactory/mf-mongoose-audittrail)###
Track who and when documents are created and updated without complex programming.  Compare and contract different versions of each document.

### [mf-mongoose-dto](https://github.com/MEANFactory/mf-mongoose-dto) ###
Convert to/from JSON DTO while applying optional level-based hiding.

### [mf-mongoose-softdelete](https://github.com/MEANFactory/mf-mongoose-softdelete) ###
Increase data integrity by retaining historical data and preventing data from being permanently deleted.  Each `delete` operation causes the document to be marked as "deleted" and subsequently hidden from result sets.

### [mf-mongoose-validate](https://github.com/MEANFactory/mf-mongoose-validate) ###
Provides additional validation for extended data types, field lengths, arrays, and other useful features.

And, of course...

### [mf-mongoose-plugins](https://github.com/MEANFactory/mf-mongoose-plugins) (this plugin) ###
Helper project to instantiate any of the installed mf-mongoose plugins.

## Contact Information ##
MEAN Factory  
[support@meanfactory.com](mailto:support@meanfactory.com)  
[www.MEANFactory.com](http://www.MEANFactory.com)  
