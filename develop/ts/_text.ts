export const textWindow = (text: string) => {
  let msg_buff = '';

  const message = (msg) => {
    if (msg_buff == '') {
      msg_buff += msg + '\n';
      message_char();
    } else {
      msg_buff += msg + '\n';
    }
  }

  const message_char = () => {
    if (msg_buff == '') {
      return;
    }
    let c = msg_buff.slice(0, 1)
    if (c == '\n') {
      c = '<br>';
    }
    document.getElementById('textBox').innerHTML += c;
    msg_buff = msg_buff.slice(1);
    setTimeout(() => message_char(), 45);
  }

  document.getElementById('textBox').innerHTML = ''
  message(text)
}