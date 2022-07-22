import ServerApp from "./models/server.js";
import dotenv from 'dotenv';
dotenv.config()

const server = new ServerApp();

server.execute();
