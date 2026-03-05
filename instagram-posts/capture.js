const http = require('http');
const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');

const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const OUT = path.join(__dirname, 'exports');
if (!fs.existsSync(OUT)) fs.mkdirSync(OUT, { recursive: true });

// Known positions from DOM query (post gap = 20px padding + 1080px height)
const posts = [
  { id: 'post1', y: 20 },
  { id: 'post2', y: 1120 },
  { id: 'post3', y: 2220 },
  { id: 'post4', y: 3320 },
  { id: 'post5', y: 4420 },
];

(async () => {
  const chrome = spawn(CHROME, [
    '--headless=new',
    '--remote-debugging-port=9334',
    '--disable-gpu',
    '--no-sandbox',
    '--window-size=1120,1200',
    '--hide-scrollbars',
    'http://localhost:4455/posts.html'
  ], { stdio: 'ignore' });

  await new Promise(r => setTimeout(r, 3500));

  const targets = await new Promise((resolve, reject) => {
    http.get('http://localhost:9334/json', res => {
      let d = ''; res.on('data', c => d += c); res.on('end', () => resolve(JSON.parse(d)));
    }).on('error', reject);
  });

  const target = targets.find(t => t.type === 'page');
  if (!target) { console.error('no page target'); chrome.kill(); process.exit(1); }

  const WebSocket = require('ws');
  const client = new WebSocket(target.webSocketDebuggerUrl);
  let msgId = 1;
  const send = (method, params = {}) => new Promise(resolve => {
    const id = msgId++;
    const handler = msg => {
      const data = JSON.parse(msg);
      if (data.id === id) { client.off('message', handler); resolve(data.result); }
    };
    client.on('message', handler);
    client.send(JSON.stringify({ id, method, params }));
  });

  await new Promise(r => client.on('open', r));
  await new Promise(r => setTimeout(r, 2000));

  await send('Page.enable');
  // Set large viewport so full page is laid out
  await send('Emulation.setDeviceMetricsOverride', {
    width: 1120, height: 5600, deviceScaleFactor: 1, mobile: false
  });
  await new Promise(r => setTimeout(r, 500));

  for (const post of posts) {
    const shot = await send('Page.captureScreenshot', {
      format: 'png',
      captureBeyondViewport: true,
      clip: { x: 20, y: post.y, width: 1080, height: 1080, scale: 1 }
    });
    const outPath = path.join(OUT, `${post.id}.png`);
    fs.writeFileSync(outPath, Buffer.from(shot.data, 'base64'));
    const size = fs.statSync(outPath).size;
    console.log(`✓ ${post.id}.png  (${Math.round(size/1024)}KB)`);
  }

  client.close();
  chrome.kill();
  console.log('\nAll done! Files in:', OUT);
})().catch(e => { console.error(e); process.exit(1); });
