/* =========================================================================
   Typing Master — tiny static file server (tools/serve.js)
   -------------------------------------------------------------------------
   Optional. The app needs no server at all: opening index.html from disk
   works fine. This is only here for local testing, or for checking the site
   behind a path prefix the way GitHub Pages serves it.

       node tools/serve.js [port]

   Then open http://localhost:8080/
   ========================================================================= */
'use strict';

const http = require('http');
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const PORT = parseInt(process.argv[2], 10) || 8080;

const TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.md': 'text/markdown; charset=utf-8'
};

http.createServer((req, res) => {
  const url = decodeURIComponent(req.url.split('?')[0]);
  // Resolve inside ROOT only, so ../ cannot escape the project.
  let rel = path.normalize(url).replace(/^([/\\])+/, '');
  let target = path.join(ROOT, rel);
  if (!target.startsWith(ROOT)) {
    res.writeHead(403).end('Forbidden');
    return;
  }
  // Directory requests (including "/") serve their index.html, exactly like
  // GitHub Pages does for a project site.
  if (rel === '' || target.endsWith(path.sep) || isDirectory(target)) {
    target = path.join(target, 'index.html');
  }
  fs.readFile(target, (err, data) => {
    if (err) {
      res.writeHead(404, { 'Content-Type': 'text/plain' }).end('Not found');
      return;
    }
    res.writeHead(200, { 'Content-Type': TYPES[path.extname(target)] || 'application/octet-stream' });
    res.end(data);
  });
}).listen(PORT, () => {
  console.log('Typing Master → http://localhost:' + PORT + '/');
});

function isDirectory(p) {
  try { return fs.statSync(p).isDirectory(); } catch (e) { return false; }
}
