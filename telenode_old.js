var http = require("http");
var url = require("url");
var urlencode = require('urlencode');
var exec = require("child_process").exec;
var child = initTelegram(false);

var server = http.createServer(function(req, res) {
        var pathname = url.parse(req.url).pathname;
        //pathname = urlencode(pathname, 'utf-8');
        res.writeHead(200);
        console.log("pathname: " + pathname);
        res.end(urlencode("отправлено", 'utf-8'));
        var command = validateAndParse(pathname);
        console.log("command: " + command);
        child.stdin.write(command);

/*
        if (pathname == "/cmd") {
            child.stdin.write("msg Kazarin test\n");
        } else if (pathname == "/quit" || pathname == "/exit") {
            child.stdin.write("safe_quit\n");
        } else if (pathname == "/init") {
            child = initTelegram(false);
        } 
        */
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

function validateAndParse(stringToParse) {
    if (stringToParse == "") return "";
    var result = "";

    var cmds = stringToParse.split("%20");
//    console.log("cmds[0]: " + cmds[0]);
    if (cmds[0] == "/msg") {
        result = cmds.join(" ");
    } 
    result = result.substring(1) + "\n";
    console.log("result: " + result);
    return result;

}

