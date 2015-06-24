var http = require("http");
var url = require("url");
var exec = require("child_process").exec;
var child = initTelegram(false);

var server = http.createServer(function(req, res) {
        var pathname = url.parse(req.url).pathname.substring(1);

        pathname = decode(pathname);
        
        var command = pathname + "\n";
        console.log("command: " + command);
        child.stdin.write(command);
        res.writeHead(200);
        res.end("OK");
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

function decode (what) {
    var result = "";
    var newChar = false;
    var ch = '';
    var charArr = what.split('');
    for (var i = 0; i < charArr.length; i++ ) {
        if (charArr[i] == '%') {
            var chInt = parseInt(ch);
            result += String.fromCharCode(chInt);
            ch = '';
            newChar = true;           
        } else if (newChar) {
            ch = charArr[i];
            newChar = false;
        } else {
            ch += charArr[i];
        }

    }
}
