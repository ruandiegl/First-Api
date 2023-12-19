const http = require('http');

const { URL } = require('url');

const bodyParser = require('./helper/bodyparser')
const routes = require('./routes');
const { stat } = require('fs');

//Criar servidor, e pegar o metodo
const server = http.createServer(function (request, response){
    const parsedUrl = new URL(`http://localhost:3000${request.url}`)
    

    console.log(`Request method: ${request.method} | Endpoint: ${parsedUrl.pathname}`)

    let {pathname} = parsedUrl;
    let id = null
//pegar os paramentros da url
    const splitendpoint = pathname.split('/').filter((Boolean)) ;
  
    if(splitendpoint.length > 1) {
      pathname = `/${splitendpoint[0]}/:id`;
      id = splitendpoint[1];
    }
    
    const route = routes.find((routeObj) => ( 
        routeObj.endpoint === pathname && routeObj.method === request.method
    ));


     if(route) {
        request.query = Object.fromEntries(parsedUrl.searchParams);
        request.params = { id };

         response.send = (statusCode, body) => {
         response.writeHead(statusCode, {'content-type': 'application/json'})
         response.end(JSON.stringify(body));
        }
        if(['POST', 'PUT', 'PATCH'].includes(request.method)) {
      
         bodyParser(request, () => route.handler(request,response)) 

         }else {
            route.handler(request,response)

         }
        
        
        
     }else {
        response.writeHead(404, { 'Content-type': 'text/html' })
        response.end(`cannot ${request.method} ${parsedUrl.pathname}`);
     }   
    
    /*if( request.url === '/users' &&  request.method ==='GET'){
       usercontroler.listusers(request, response);

    } else {
        
    }*/
    //response.writeHead(200, { 'Content-type': 'text/html' })
    //response.end('<h1> hello word!</h1>');
});

server.listen(3000, () => console.log(' server started at http://localhost:3000'));