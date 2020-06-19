const pokemonData = require('../json/data.json')
const trick = require('../json/trick.json')
import textWindow from './_text';
import Pokemon from './_class';
import * as btn from "./_btn";


document.addEventListener('DOMContentLoaded', () => {
  generatePoke()
  changeURL()
  btn.btnClick()
  btn.keyAction()
  changeDisplay()
})

const getTrick = id => trick[id];

const generatePoke = () => {
  let
    trickData = [],
    poke = pokemonData[0]
  for(let i in poke.tricks) {
    trickData.push(getTrick(i))
  }
  poke.tricks = trickData
  let args = Object.values(poke)
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

const changeDisplay = () => {
  document.getElementById('change').onclick = () => {
    const status = document.querySelectorAll('.status-block')
    Array.prototype.forEach.call(status, (ele) => {
      if (ele.getAttribute('state') === "ball") {
        ele.setAttribute('state', 'status')
      } else {
        ele.setAttribute('state', 'ball')
      }
    })
  }
}