const pokemonData = require('./data.json')
// import textWindow from './_text';
import Pokemon from './_class';
import * as btn from "./_btn";


document.addEventListener('DOMContentLoaded', () => {
  genaratePoke()
  changeURL()
  btn.btnClick()
  btn.keyAction()
})

const genaratePoke = () => {
  const args = Object.values(pokemonData[0])
  const poke1 = new Pokemon(...args)
  console.log(poke1);
}

const changeURL = () => {
  let str;
  const num = Math.floor(Math.random() * (7 - 1)) + 1
  if (num === 1) {
    str = "▴(｡◕ᴥ◕｡)▴"
  }
  else if (num === 2) {
    str = "⟅̀⁍̃◡⁌̃⟆́"
  }
  else if (num === 3) {
    str = "ˆ⁍◡⁌ˆ"
  }
  else if (num === 4) {
    str = "⧫(◕ˑ̫◕)⧫"
  }
  else if (num === 5) {
    str = "⊃(◎)⊂"
  }
  else if (num === 6) {
    str = "╰(◕o◕)╮_=͟͟͞͞◒"
  }
  history.replaceState('', '', str)
}