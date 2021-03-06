var http = require("http");
var url = require("url");
var sys = require('sys');
var exec = require("child_process").exec;
var cmd = "../tg/bin/telegram-cli -k ../tg/tg-server.pub -W -C -R -e ";

var resurs;


var server = http.createServer(function(req, res) {
        var start = new Date();
        console.log(start.getHours() + ":" + start.getMinutes() + ":" + start.getSeconds());
        var pathname = url.parse(req.url).pathname.substring(1);
        resurs = res;
        pathname = decode(pathname);         
        var command = cmd + '"' + pathname + '"';
        console.log("command: " + command);
        exec(command, puts);
        res.writeHead(10);
        
    }
);

server.listen(7777);

function puts(error, stdout, stderr) { 
    console.log("OK");
    var fin = new Date();
    console.log(fin.getHours() + ":" + fin.getMinutes() + ":" + fin.getSeconds());
    sys.puts(stdout);
    resurs.end(stdout);
}

function decode (what) {
    var result = "";
    var newChar = false;
    var chInt;
    var ch = '';
    var charArr = what.split('');
    for (var i = 1; i < charArr.length; i++ ) {
        if (charArr[i] == '%') {
            chInt = parseInt(ch);            
            if (chInt == 1048) {
                result += 'И';
            } else {
                result += String.fromCharCode(chInt);
            }
            
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
        result += String.fromCharCode(chInt);
    }    
    return result
}
