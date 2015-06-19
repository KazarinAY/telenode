var exec = require("child_process").exec;
var child = initTelegram(true);

var io = require('socket.io').listen(8080);
io.sockets.on('connection', function (socket) {
    socket.on('my event', function (msg) {
        console.log("DATA: " + msg);        
        if (isValide(msg)) {
            console.log("validation OK");
            child.stdin.write(msg + "\n");
        }
    });
});

function initTelegram(isStdoutOn) {
    child = exec("../tg/bin/telegram-cli -k ../tg/tg-server.pub"); // run telegram client
    child.stdin.setEncoding = 'utf-8';
    if (isStdoutOn) {
        child.stdout.on('data', function(data) {
            if (data == "> ") {return;}             
            console.log("DATA \"" + data + "\"");   
        });
        child.stderr.on('data', function(data) {
            console.log(data);
        });
    }
    child.on('close', function(code) {
                console.log('closing code: ' + code);
    });
    child.stdin.write("contact_list\n"); //без него будет "can not parse arg #1"  
    return child; 
}
function isValide(message) {
    if (message == "") return false;
//    if (message.substring(0, 4) != "msg" ) return false;
    
    return true;
}
