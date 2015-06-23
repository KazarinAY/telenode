var http = require("http");
var url = require("url");
var exec = require("child_process").exec;
var child = initTelegram(false);

var server = http.createServer(function(req, res) {
        var pathname = url.parse(req.url).pathname;
        pathname = decodeURIComponent(pathname);
        res.writeHead(200);
        res.end("OK");
        if (pathname == "/favicon.ico") return;

        var command = pathname.substring(1) + "\n";
        console.log("command: " + command);
        child.stdin.write(command);
    }
);

server.listen(7777);

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
