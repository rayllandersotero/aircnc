const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const socketio = require('socket.io');

require('dotenv').config();

const path = require('path');
const http = require('http');

const router = require('./routes');

const app = express();
const server = http.Server(app);
const io = socketio(server);

mongoose.connect(process.env.DATA_BASE, {
	useNewUrlParser: true,
	useUnifiedTopology: true
});

const connectedUsers = {};

io.on('connect', (socket) => {
	const { user_id } = socket.handshake.query;
	connectedUsers[user_id] = socket.id;
});

app.use((req, res, next) => {
	req.io = io;
	req.connectedUsers = connectedUsers;
	return next();
});
app.use(cors());
app.use(express.json());
app.use('/files', express.static(path.resolve(__dirname, '..', 'uploads')));
app.use(router);

server.listen(3000, console.log('Connected at port 3000'));
