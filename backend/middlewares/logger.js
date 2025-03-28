const fs = require('fs');
const path = require('path');

const logFilePath = path.join(__dirname, '../logs.json');

async function logger(req, res, next) {
    if (req.path === '/favicon.ico') {
        return res.status(204).end();
    }

    let logs = [];

    try {
        // Read existing logs synchronously to avoid async issues
        if (fs.existsSync(logFilePath)) {
            const data = fs.readFileSync(logFilePath, 'utf-8');
            logs = JSON.parse(data);
        }
    } catch (error) {
        console.error("Error reading logs.json:", error);
        logs = []; // Reset logs if reading/parsing fails
    }

    const logEntry = {
        index: logs.length + 1,
        client_ip: req.ip || req.connection.remoteAddress,
        client_url: req.get('Referer') || 'Direct Access',
        server_url: req.originalUrl,
        timestamp: new Date().toISOString()
    };

    logs.push(logEntry);

    try {
        // Write logs synchronously to avoid race conditions
        fs.writeFileSync(logFilePath, JSON.stringify(logs, null, 2), 'utf-8');
    } catch (writeErr) {
        console.error("Error writing logs.json:", writeErr);
    }

    next(); // Move to next middleware AFTER writing logs
}

module.exports = logger;
