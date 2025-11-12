const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 8000;
const baseDir = __dirname;
const STOCKS_DATA_FILE = path.join(baseDir, 'stocks_data.json');

const mimeTypes = {
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.wav': 'audio/wav',
  '.mp4': 'video/mp4',
  '.woff': 'application/font-woff',
  '.ttf': 'application/font-ttf',
  '.eot': 'application/vnd.ms-fontobject',
  '.otf': 'application/font-otf',
  '.wasm': 'application/wasm'
};

// 종목 데이터 파일 읽기
function readStocksData() {
  try {
    if (fs.existsSync(STOCKS_DATA_FILE)) {
      const data = fs.readFileSync(STOCKS_DATA_FILE, 'utf8');
      return JSON.parse(data);
    }
  } catch (error) {
    console.error('종목 데이터 읽기 실패:', error);
  }
  return { sectorOverrides: {}, customStocks: {} };
}

// 종목 데이터 파일 쓰기
function writeStocksData(data) {
  try {
    fs.writeFileSync(STOCKS_DATA_FILE, JSON.stringify(data, null, 2), 'utf8');
    return true;
  } catch (error) {
    console.error('종목 데이터 쓰기 실패:', error);
    return false;
  }
}

const server = http.createServer((req, res) => {
  console.log(`${req.method} ${req.url}`);

  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return;
  }

  // 종목 데이터 API
  if (req.url === '/api/stocks' || req.url === '/api/stocks/') {
    if (req.method === 'GET') {
      // 종목 데이터 읽기
      const data = readStocksData();
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(data), 'utf-8');
      return;
    } else if (req.method === 'POST') {
      // 종목 데이터 저장
      let body = '';
      req.on('data', chunk => {
        body += chunk.toString();
      });
      req.on('end', () => {
        try {
          const data = JSON.parse(body);
          if (writeStocksData(data)) {
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ success: true }), 'utf-8');
          } else {
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ success: false, error: '저장 실패' }), 'utf-8');
          }
        } catch (error) {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ success: false, error: '잘못된 데이터 형식' }), 'utf-8');
        }
      });
      return;
    }
  }

  let filePath = '.' + req.url;
  if (filePath === './') {
    filePath = './stock_news_tracker.html';
  }

  const extname = String(path.extname(filePath)).toLowerCase();
  const contentType = mimeTypes[extname] || 'application/octet-stream';

  fs.readFile(filePath, (error, content) => {
    if (error) {
      if (error.code === 'ENOENT') {
        res.writeHead(404, { 'Content-Type': 'text/html' });
        res.end('<h1>404 - File Not Found</h1>', 'utf-8');
      } else {
        res.writeHead(500);
        res.end(`Server Error: ${error.code}`, 'utf-8');
      }
    } else {
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content, 'utf-8');
    }
  });
});

server.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running at http://localhost:${PORT}/`);
  console.log(`Access the app at: http://localhost:${PORT}/stock_news_tracker.html`);
  console.log(`Press Ctrl+C to stop the server`);
});

