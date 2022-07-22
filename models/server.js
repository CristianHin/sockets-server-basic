import express from 'express';
import serverConfig from 'http';
import path from 'path';
import cors from 'cors'
import {Server} from 'socket.io';
import { fileURLToPath } from 'url';
import Sockets from './sockets.js';

export default class ServerApp {
    constructor() {
        this.port = process.env.PORT || 8080;
        this.app = express();
        this.server = serverConfig.createServer(this.app);
        this.io = new Server(this.server);
    }

    sockets() {
        new Sockets(this.io)
    }

    middlewares(){
        const __filename = fileURLToPath(import.meta.url);
        const __dirname = path.dirname(__filename);
        this.app.use(express.static(path.join(__dirname, '../public')));
        this.app.use(cors())
    }

    execute(){
        this.middlewares()
        this.sockets()
        this.server.listen(this.port, () => {
            console.log('server listening on port', this.port);
        });
    }
}
