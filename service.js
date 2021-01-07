let http = require('http');
let fs = require('fs')
http.createServer((req,res) => {
    res.setHeader("Content-Type","text/html; charset=utf-8");
    let path = '';
    switch(req.url){
        case "/":
            path = '/index.html';
        break;
        case "/nosotros":
            path = '/about.html';
        break;
        case "/proyectos":
            path = '/projects.html';
        break;
        case "/contacto":
            path = '/contact.html';
        break;
        case "/favicon.ico":
            path = '/fav.png';
        break;
        default:
            path = '/404.html';
        break;
    }
    fs.readFile(`./vistas/${path}`,(err,cont) =>{
        if(!err){
            res.write(cont);
        }else{
            res.write("<h1>404</h1>");
        }
        res.end();
    })
}).listen(8080);