var username = null;

function webSocketInit() {
    if ("WebSocket" in window) {
        const sendButton = document.getElementById('send');
        const setButton = document.getElementById('set');
        const msgEntry = document.getElementById('msgField');
        const nameEntry = document.getElementById('nameField');
        const bodyText = document.getElementById('messageBody');

        ws = new WebSocket("ws://174.76.22.234:7890");

        ws.onopen = function() {
            console.log('Connected to socket');
        }

        ws.onclose = function() {
            console.log("Socket connection has closed");
        }

        ws.onmessage = function(msg){
            console.log('Message recieved',msg);
            msg = JSON.parse(msg.data);

            let parentDiv = document.createElement("div");
            let nameDiv = document.createElement("div");
            let msgDiv = document.createElement("div");
            let message = document.createTextNode(msg.message);
            let name = document.createTextNode(msg.user);
            parentDiv.className = 'parent';
            nameDiv.className = 'name';
            msgDiv.className = 'msg';
            nameDiv.setAttribute("style", 'color: rgb(' + msg.color[0] + ',' + msg.color[1] + ',' + msg.color[2] + ');');

            msgDiv.appendChild(message);
            nameDiv.appendChild(name);
            parentDiv.appendChild(nameDiv);
            parentDiv.appendChild(msgDiv);
            bodyText.appendChild(parentDiv);
        }

        const send_msg = function(message){
            ws.send(message);
        }



        sendButton.onmouseup = function(){
            let data = {};
            data.message = msgEntry.value.trim();
            data.user = username;
            if (data.message) {
                ws.send(JSON.stringify(data));
            }
            msgEntry.value = '';
        }

        setButton.onmouseup = function(){
            let name = nameEntry.value.trim();
            if (name) username = name;
            document.querySelector('.modal').setAttribute('style','display: none');
        }
    }
}

document.addEventListener("DOMContentLoaded", function(event) {
    webSocketInit();
});
