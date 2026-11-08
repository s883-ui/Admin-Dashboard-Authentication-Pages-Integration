// تشغيل محلي بدون CORS: node server.js  ثم افتح الرابط اللي بيظهر
const http=require('http'),https=require('https'),fs=require('fs'),path=require('path');
const TARGET='sfeg-system.runasp.net';
const types={'.html':'text/html; charset=utf-8','.js':'text/javascript','.css':'text/css','.jpg':'image/jpeg','.png':'image/png'};
http.createServer((req,res)=>{
  if(/^\/(api|Account)\b/i.test(req.url)){
    const h={...req.headers,host:TARGET};delete h.origin;delete h.referer;
    const p=https.request({host:TARGET,path:req.url,method:req.method,headers:h},r=>{res.writeHead(r.statusCode,r.headers);r.pipe(res)});
    p.on('error',()=>{res.writeHead(502);res.end()});
    req.pipe(p);return;
  }
  const u=decodeURIComponent(req.url.split('?')[0]).replace(/\.\./g,'');
  const f=path.join(__dirname,u==='/'?'index.html':u);
  fs.readFile(f,(e,d)=>{if(e){res.writeHead(404);return res.end()}
    res.writeHead(200,{'Content-Type':types[path.extname(f)]||'application/octet-stream'});res.end(d)});
}).listen(3000,()=>console.log('Open: http://localhost:3000/?api=http://localhost:3000'));
