const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const http = require('http');
const mongoose = require('mongoose');
const routes = require('./server/routes');
const app = express();
var cors = require('cors');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors())
app.use('/api', routes);
app.use(express.static(__dirname + '/src'));
app.get('/*', function(req,res) {
res.sendFile(path.join(__dirname+'/index.html'));
});

mongoose.connect('mongodb+srv://pingit:pingit@cluster0-oqsqu.mongodb.net/pingit?retryWrites=true&w=majority');
mongoose.connection.on('error', console.error.bind(console, 'Database connection error:'));
mongoose.connection.once('open', function () {
  console.info('Successfully connected to the database');
});

const port = process.env.PORT || '3000';
app.set('port', port);

const server = http.createServer(app);

server.listen(port, function () {
  console.info(`Server started on http://localhost:${port}`)
});