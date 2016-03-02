
var program = require('commander');
var SMTPServer = require('smtp-server').SMTPServer;
var packageInfo = require('./package.json');

program
    .version(packageInfo.version)
    .option('-p, --port [number]', 'port to listen for smtp [2525]', '2525')
    .parse(process.argv);

var options = {
    stream: process.stdout
};

var server = new SMTPServer({
    onData: function (stream, session, callback) {
        var data = '';

        if (options.stream) {
            stream.pipe(options.stream);
        }

        stream.setEncoding('utf8');
        stream.on('data', function (chunk) {
            data += chunk;
        });
        stream.on('end', function () {
            callback();
        });
    },
    onAuth: function (auth, session, callback){
        // allow any credentials
        callback(null, {user: auth.username});
    },
    hideSTARTTLS: true
});

server.on('error', function (err) {
    console.error('Error %s', err.message);
});

console.log('Starting smtp server on port %s', program.port);
server.listen(program.port);
