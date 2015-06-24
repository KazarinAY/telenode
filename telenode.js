var http = require("http");
var url = require("url");
var exec = require("child_process").exec;
var cmd = "../tg/bin/telegram-cli -k ../tg/tg-server.pub -W -e ";

var server = http.createServer(function(req, res) {
        var pathname = url.parse(req.url).pathname.substring(1);
        pathname = decode(pathname);        
        var command = cmd + '"' + pathname + '"';
        console.log("command: " + command);
        child = exec(command);
        res.writeHead(200);
        res.end("OK");
    }
);

server.listen(7777);

function decode (what) {
    var result = "";
    var newChar = false;
    var chInt;
    var ch = '';
    var charArr = what.split('');
    for (var i = 0; i < charArr.length; i++ ) {
        if (charArr[i] == '%') {
            chInt = parseInt(ch);
 //           console.log(String.fromCharCode(chInt)); 
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
    if (chInt) {
        chInt = parseInt(ch);
 //       console.log(String.fromCharCode(chInt)); 
        result += String.fromCharCode(chInt);
    }    
    return result
}
