let http = require('http');
let fs = require('fs');
let mime = require("mime")
http.createServer((req,res) => {
    res.setHeader("Content-Type","text/html; charset=utf-8");
    if(req.method == "GET"){
        switch(req.url){
            case "/":
                leeArchivo(res,'/index.html');
            break;
            case "/nosotros":
                leeArchivo(res,'/about.html');
            break;
            case "/proyectos":
                leeArchivo(res,'/projects.html');
            break;
            case "/contacto":
                leeArchivo(res,'/contact.html');
            break;
            case "/favicon.ico":
                leeArchivo(res,'/fav.png');
            break;
            case "/forms":
                leeArchivo(res,'formulario.html')
                break;
            default:
                leeArchivo(res,req.url);
            break;
        }
    }else if(req.method === "POST"){
        let data = '';

        //Cuando se estén recibiendo datos
        req.on('data', chunk => {
            data += chunk;
        });
        
        //Cuando se terminen de procesar los datos
        req.on('end', () => {
            
            console.log(data);
            let datos = obtenData(data);
            fs.writeFile("usuarios2.txt", datos, (error) => {
                if(error){
                    console.log(error);
                }
            });

            console.log("Fin del stream");
        });

        req.on('error', error => {
            console.log(error);
        })

    }
}).listen(8080);
const leeArchivo = (res,path) => {
    let url = __dirname +`/vistas/${path}`;
    console.log(url);
    fs.readFile(url,(err,cont) =>{
        if(!err){
            res.setHeader("Content-Type",mime.getExtension(url));
            res.end(cont);
        }else{
            res.write("<h1>404</h1>");
            res.end();
        }
    });
}

const obtenData = (val) =>{
    let arr = val.split('&');
    let str = '';
    arr.forEach(el => {
        let keys = el.split('=');
        str += `${keys[0]}:${keys[1]}\n`;
    });
    return str;
}