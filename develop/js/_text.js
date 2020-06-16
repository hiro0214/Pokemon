"use strict";
exports.__esModule = true;
exports["default"] = (function (text) {
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
        setTimeout(function () { return message_char(); }, 45);
    }
    document.getElementById('textBox').innerHTML = "";
    document.getElementById('textBox').style.opacity = "1";
    message(text);
});
