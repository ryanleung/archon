var express  = require('express')
, path     = require('path')
, stylus   = require('stylus')
, routes   = require('./backend/routes');

var Datastore = require('nedb')
, db = new Datastore({ filename: 'db', autoload: true });

var app = express();

app.configure(function() {
    app.set('port', process.env.PORT || 8080);

    app.use(stylus.middleware({
        src: __dirname + '/frontend/stylus',
        dest: __dirname + '/public/compiled/'
    }));
    app.use(app.router);
    app.use(express.static(__dirname + '/public/' ));
    app.use('/', express.static(__dirname + '/frontend/' ));
});

app.listen(app.get('port'), function(){
    console.log('Express server listening on port ' + app.get('port'));
});
