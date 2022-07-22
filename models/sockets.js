export default class Sockets {
    constructor(io){
        this.io = io;
        this.socketsEvents();
    }

    socketsEvents() {
        this.io.on('connect', (socket) => {
            socket.emit('welcome', 'welcome to server')
            socket.on('message-to-server', (payload) => {
                this.io.emit('message-from-server', payload);
            })
        })
    }
}