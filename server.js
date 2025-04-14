const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 8080 });

wss.on('connection', (ws) => {
    console.log('Client connected');

    const severities = ['INFO', 'WARN', 'ERROR'];
    const interval = setInterval(() => {
        const log = {
            id: Math.random().toString(36).substring(2),
            timestamp: new Date().toISOString(),
            severity: severities[Math.floor(Math.random() * severities.length)],
            message: `Sample log message ${Math.floor(Math.random() * 100)}`,
        };
        ws.send(JSON.stringify(log));
    }, 2000);

    ws.on('close', () => {
        console.log('Client disconnected');
        clearInterval(interval);
    });
});

console.log('WebSocket server running on ws://localhost:8080');