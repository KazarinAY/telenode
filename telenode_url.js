var http = require("http");
var url = require("url");
var fs = require('fs');
var exec = require("child_process").exec;
var child = initTelegram(true);

var server = http.createServer(function(req, res) {
        var pathname = url.parse(req.url).pathname;
        pathname = decodeURIComponent(pathname);
        res.writeHead(200);
        console.log("pathname: " + pathname);
        res.end("OK");
//        var command = validateAndParse(pathname);
        pathname = pathname.substring(1);
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
            fs.appendFile('log.txt', data, function (err) {
                if (err) return console.log(err);                
            }); 
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

function validateAndParse(stringToParse) {
    console.log("result: " + stringToParse);
    if (stringToParse == "") return "";
    var result = "";

    var cmds = stringToParse.split(" ");
//    console.log("cmds[0]: " + cmds[0]);
    if (cmds[0] == "/msg") {
        result = cmds.join(" ");
    } 
    result = result.substring(1) + "\n";
    console.log("result: " + result);
    return result;

}

