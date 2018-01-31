const ws = require('nodejs-websocket');
const http = require('http');
const fs = require('fs');
const { addy } = require('./connection');

const history = [];

http.createServer(function(req,res){
    fs.createReadStream('index.html').pipe(res);
}).listen(addy.http_port,addy.current_ip);

const server = ws.createServer(function(conn){
    console.log('*~New connection');

    const color = [
        Math.floor(Math.random() * 200),
        Math.floor(Math.random() * 200),
        Math.floor(Math.random() * 200)
    ];

    if (history.length){
        history.forEach(function(msg){
            conn.sendText(JSON.stringify(msg));
        });
    }

    conn.on("text",function(str){
        console.log(str);
        let message = JSON.parse(str);
        history.push(message);
        if (history.length > 50) history.splice(-50);
        message.color = color;
        sendAll(JSON.stringify(message))

    });


    conn.on("close",function(code, reason){
        console.log('Connection closed~*');
    });
    conn.on('error',function(){
        console.log('shit went south');
        console.log(arguments);
        console.log("connection length: "+server.connections.length)
    });

    sendAll(JSON.stringify({user:'--dingdong--',message:'',color: [200,0,0]}));

});

function sendAll(msg){
    server.connections.forEach(function(conn){
        conn.sendText(msg);
    });
}

server.listen(addy.ws_port,addy.current_ip,() => {
    console.log('<---| Listening to socket on 7890 |--->');
});
