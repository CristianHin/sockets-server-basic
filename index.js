import express from 'express';
import serverConfig from 'http';
import path from 'path';
import {Server} from 'socket.io';
import { fileURLToPath } from 'url';

const app = express();
const server = serverConfig.createServer(app);
const io = new Server(server);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(__dirname + '/public'));

io.on('connect', (socket) => {
    socket.emit('welcome', 'welcome to server')
    socket.on('message-to-server', (payload) => {
        io.emit('message-from-server', payload);
    })
})

server.listen(8080, () => {
    console.log('server listening on port 8080')
});