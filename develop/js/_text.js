"use strict";
exports.__esModule = true;
exports.textWindow = function (text) {
    var msg_buff = '';
    function message(msg) {
        if (msg_buff == '') {
            msg_buff += msg + "\n";
            message_char();
        }
        else {
            msg_buff += msg + "\n";
        }
    }
    function message_char() {
        if (msg_buff == '') {
            return;
        }
        var c = msg_buff.slice(0, 1);
        if (c == "\n") {
            c = '<br>';
        }
        //  else if (c == "▼") {
        //   c = `<span class="nextIcon">▼</span>`;
        // } else if (c == "☆") {
        //   c = `<span class="command"></span>`;
        // }
        document.getElementById('textBox').innerHTML += c;
        msg_buff = msg_buff.slice(1);
        setTimeout(function () { return message_char(); }, 35);
    }
    document.getElementById('textBox').innerHTML = "";
    message(text);
};
