const express = require('express');
const { Server } = require('ws');

const PORT = process.env.PORT || 3000;

const server = express()
    .listen(PORT, () => console.log(`Listening on ${PORT}`));

const wss = new Server({ server });

wss.on('connection', (ws, req) => {
    console.log('Client connected: ', req.socket.remoteAddress);
    ws.on('close', () => console.log('Client disconnected'));
    ws.on('message', data => {
        wss.clients.forEach(client => {
            if (client !== ws) client.send(data);
        });
    });
});

// setInterval(() => {
//     wss.clients.forEach((client) => {
//         client.send(new Date().toTimeString());
//     });
// }, 1000);