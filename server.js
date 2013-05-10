var express = require('express');
var server = express();
server.use(express.static(__dirname + '/public'));
server.listen(process.env.VCAP_APP_PORT || 8000);
