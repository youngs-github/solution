const fs = require('fs');
const http = require('http');
const path = require('path');

http
  .createServer((req, res) => {
    res.writeHead(200);
    if (req.method === 'GET') {
      if (req.url === '/index.html') {
        return fs
          .createReadStream(path.resolve(__dirname, './index.html'))
          .pipe(res);
      }
      if (req.url === '/index.js') {
        return fs
          .createReadStream(path.resolve(__dirname, './index.js'))
          .pipe(res);
      }
      if (req.url === '/style.css') {
        res.writeHead(200, {
          'Content-Type': 'text/css'
        });
        return fs
          .createReadStream(path.resolve(__dirname, './style.css'))
          .pipe(res);
      }
    }
    res.end('404');
  })
  .listen(3000, () => {
    console.log('服务器已启动...');
  });
