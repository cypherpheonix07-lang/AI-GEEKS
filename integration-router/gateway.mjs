import http from 'http';
import https from 'https';
import { parse } from 'url';

const GATEWAY_PORT = parseInt(process.env.PORT || '3000', 10);
const ORIGINAL_PORT = parseInt(process.env.ORIGINAL_PORT || '3001', 10);
const DEVFEST_PORT = parseInt(process.env.DEVFEST_PORT || '3002', 10);

const ORIGINAL_TARGET = `http://127.0.0.1:${ORIGINAL_PORT}`;
const DEVFEST_TARGET = `http://127.0.0.1:${DEVFEST_PORT}`;

function proxyRequest(req, res, targetPort) {
  const parsedUrl = parse(req.url);
  const options = {
    hostname: '127.0.0.1',
    port: targetPort,
    path: parsedUrl.path,
    method: req.method,
    headers: {
      ...req.headers,
      host: req.headers.host || `localhost:${GATEWAY_PORT}`,
      'x-forwarded-host': req.headers.host || `localhost:${GATEWAY_PORT}`,
      'x-forwarded-proto': 'http',
      'x-forwarded-for': req.socket.remoteAddress || '127.0.0.1',
    },
  };

  const proxyReq = http.request(options, (proxyRes) => {
    res.writeHead(proxyRes.statusCode, proxyRes.headers);
    proxyRes.pipe(res, { end: true });
  });

  proxyReq.on('error', (err) => {
    const isDevFest = targetPort === DEVFEST_PORT;
    const targetName = isDevFest ? 'DevFest Chennai 2026' : 'AI Geeks Original Application';
    console.error(`[Gateway Proxy Error] Failed to reach ${targetName} on port ${targetPort}: ${err.message}`);

    if (!res.headersSent) {
      res.writeHead(502, { 'Content-Type': 'text/html; charset=utf-8' });
      res.end(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="utf-8">
          <title>${targetName} Warming Up</title>
          <style>
            body { background: #020813; color: #C4EEFF; font-family: system-ui, sans-serif; display: flex; align-items: center; justify-content: center; min-height: 100vh; margin: 0; }
            .card { background: #091B32; padding: 2rem 2.5rem; border-radius: 1.5rem; max-width: 500px; text-align: center; box-shadow: 0 20px 50px rgba(0,0,0,0.6); }
            h1 { font-size: 1.5rem; margin-bottom: 0.5rem; color: #fff; }
            p { font-size: 0.9rem; color: #80D8FF; line-height: 1.5; }
            .spinner { width: 36px; height: 36px; border: 3px solid rgba(128,216,255,0.2); border-top-color: #80D8FF; border-radius: 50%; animation: spin 0.8s linear infinite; margin: 1.5rem auto 0; }
            @keyframes spin { to { transform: rotate(360deg); } }
          </style>
          <meta http-equiv="refresh" content="3">
        </head>
        <body>
          <div class="card">
            <h1>${targetName}</h1>
            <p>Target service on port ${targetPort} is currently initializing. Automatically reconnecting in 3 seconds...</p>
            <div class="spinner"></div>
          </div>
        </body>
        </html>
      `);
    }
  });

  req.pipe(proxyReq, { end: true });
}

function handleUpgrade(req, socket, head, targetPort) {
  const options = {
    hostname: '127.0.0.1',
    port: targetPort,
    path: req.url,
    method: req.method,
    headers: req.headers,
  };

  const proxyReq = http.request(options);
  proxyReq.on('error', (err) => {
    console.error(`[Gateway Upgrade Error] Port ${targetPort}: ${err.message}`);
    socket.destroy();
  });

  proxyReq.on('upgrade', (proxyRes, proxySocket, proxyHead) => {
    socket.write(
      `HTTP/${proxyRes.httpVersion} ${proxyRes.statusCode} ${proxyRes.statusMessage}\r\n` +
      Object.keys(proxyRes.headers)
        .map((key) => `${key}: ${proxyRes.headers[key]}`)
        .join('\r\n') +
      '\r\n\r\n'
    );

    proxySocket.pipe(socket);
    socket.pipe(proxySocket);
  });

  proxyReq.end();
}

const server = http.createServer((req, res) => {
  const isDevFest = req.url.startsWith('/devfest');
  const targetPort = isDevFest ? DEVFEST_PORT : ORIGINAL_PORT;
  proxyRequest(req, res, targetPort);
});

server.on('upgrade', (req, socket, head) => {
  const isDevFest = req.url.startsWith('/devfest');
  const targetPort = isDevFest ? DEVFEST_PORT : ORIGINAL_PORT;
  handleUpgrade(req, socket, head, targetPort);
});

server.listen(GATEWAY_PORT, () => {
  console.log(`========================================================================`);
  console.log(`[ROUTE GATEWAY ACTIVE] Listening on http://localhost:${GATEWAY_PORT}`);
  console.log(`  -> Primary Website : http://localhost:${GATEWAY_PORT}/        (proxied to :${ORIGINAL_PORT})`);
  console.log(`  -> DevFest 2026    : http://localhost:${GATEWAY_PORT}/devfest (proxied to :${DEVFEST_PORT})`);
  console.log(`========================================================================`);
});
