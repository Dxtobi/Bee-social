import {io} from 'socket.io-client'
const endpoint = `http://localhost:5000`;
export const socket = io(endpoint, {
    transports: ['websocket'],
    rejectUnauthorized:false
});
socket.on("connect_error", (err) => {
    console.log(`connection error due to ${err.message}`)
})



