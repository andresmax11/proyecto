const http = require('http');
const express = require('express');
const EventEmitter = require('events');
const emitter = new EventEmitter();
emitter.setMaxListeners(0);

//const socketIO = require('socket.io');
const app = express();

const server = http.createServer(app);
//const io = socketIO.listen(server);

const io = require('socket.io')(server);

//app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res){
  res.sendFile(__dirname + '/public/estacionamiento.html');
});

server.listen(8080, function(){
 console.log('server listening on port',8080);
});

//COMUNICACION SERIAL
// Use a Readline parser

const { SerialPort, ReadlineParser } = require('serialport')

// Use a `\r\n` as a line terminator
const parser = new ReadlineParser({
  delimiter: '\r\n',
})

const port = new SerialPort({
  path: '/dev/ttyACM0',
  baudRate: 9600,
})

port.pipe(parser)

port.on('open', () => console.log('Port open'))

//parser.on('data',(data) =>   
//console.log(data);
//)
 

parser.on('data', function(data){
	let acel = data;
	console.log(acel);
	io.emit('acel',data)
});


port.on('close',() => console.log('Port close'))

