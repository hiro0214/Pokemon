const pokemonData = require("../json/data.json");
const trick = require("../json/trick.json");
import textWindow from "./_text";
import Pokemon from "./_class";
import * as btn from "./_btn";
import * as frame from "./_frame";

document.addEventListener("DOMContentLoaded", () => {
  changeURL();
  btn.btnClick();
  btn.keyAction();

  // bgmLoop()
  globalVariable()
  conditionalBranch();
});



/* ==========================
  Global Variable
=========================== */

let
  gameState = "battleBefore",

  player = {
    name: "サトシ",
    pokemon: [],
  },
  enemy = {
    name: "タケシ",
    pokemon: [],
  };

const globalVariable = () => {
  screen = document.getElementById('screen')
}

/* ==========================
  Function Definition
=========================== */

const
  setAttr = (tar, attr, value) => document.getElementById(tar).setAttribute(attr, value),
  addClass = (tar, className) => document.getElementById(tar).classList.add(className),
  removeClass = (tar, className) => document.getElementById(tar).classList.remove(className),

  generateStar = (color, i, left) => {
    const ele = document.createElement('div')
    ele.classList.add('star')
    ele.style.borderBottom = `10px solid ${color}`;
    ele.style.left = `${left + (i * 70)}px`
    return ele;
  },

  getTrick = id => trick[id],
  generatePoke = id => {
    let trickData = [],
      poke = pokemonData[id];
    poke.tricks.forEach((i) => {
      trickData.push(getTrick(i));
    })
    poke.tricks = trickData;
    let args = Object.values(poke);
    return new Pokemon(...args);
  },

  bgmLoop = () => {
    const bgm = new Audio("../audio/battle_loop.mp3")
    bgm.loop = true
    bgm.play()
  },

  changeURL = () => {
    let str;
    const num = Math.floor(Math.random() * (7 - 1)) + 1;
    if (num === 1) {
      str = "▴(｡◕ᴥ◕｡)▴";
    } else if (num === 2) {
      str = "⟅̀⁍̃◡⁌̃⟆́";
    } else if (num === 3) {
      str = "ˆ⁍◡⁌ˆ";
    } else if (num === 4) {
      str = "⧫(◕ˑ̫◕)⧫";
    } else if (num === 5) {
      str = "⊃(◎)⊂";
    } else if (num === 6) {
      str = "╰(◕o◕)╮_=͟͟͞͞◒";
    }
    history.replaceState("", "", str);
  };


/* ==========================
  Processing Part
=========================== */

const conditionalBranch = () => {
  switch (gameState) {
    case "opening": opening(); break;
    case "title": title(); break;
    case "field": field(); break;
    case "battleBefore": battleBefore(); break;
    case "battle": battleProcess(); break;
    case "battleAfter": battleAfter(); break;
  }
};

const changeState = state => {
  gameState = state;
  conditionalBranch();
};

const opening = () => {
  screen.innerHTML = frame.openingFrame

  const
    target = document.getElementById('starPos'),
    color = ["#f3a68c", "#79c06e", "#ffe9a9", "#8da0b6"],
    delay = 5500,
    left = 130;

  for (let i in color) {
    for (let j = 0; j < 9; j ++) {
      const
        star = generateStar(color[i], i, left),
        time = delay + (j * 140);

      setTimeout(() => {
        j >= 5 ? j -= 3 : j;
        let pos = parseInt(star.style.left) + (j * 10)
        star.style.left = pos + "px"
        target.appendChild(star)
      }, time)
    }
  }

  setTimeout(() => {
    changeState("title");
  }, 23000)
};

const title = () => {
  console.log("title");

  /* ================================
    Some kind of title processing
  ================================= */

  screen.innerHTML = frame.titleFrame

  // changeState("field");
};

const field = () => {
  console.log("field");

  /* ================================
    Some kind of field processing
  ================================= */

  screen.innerHTML = frame.fieldFrame

  // changeState("battleBefore");
};

const battleBefore = () => {
  // ポケモンの選択画面
  // document.getElementById('decideBtn').onclick = () => {
  // 決定ボタンを押したら、選択しているポケモンのオブジェクトを作成する
  // 一通りの処理が出来た後に実装予定
  // }

  player.pokemon = generatePoke(1);
  console.log(player.pokemon);
  enemy.pokemon = generatePoke(2);
  console.log(enemy.pokemon);

  screen.innerHTML = frame.battleFrame

  console.log(`${enemy.name}が\nしょうぶを　しかけてきた！`);
  console.log(`${player.name}は\n${player.pokemon.name}を　くりだした！`);
  console.log(`${enemy.name}は\n${enemy.pokemon.name}を　くりだした！`);

  changeState("battle");
};

export const battleProcess = (trick) => {
  if (!trick) {
    // command()
    return;
  }

  // ダメージ処理
  // pokemon.attack()

  if (enemy.pokemon.hp <= 0) {
    playerWon();
  }
  else if (player.pokemon.hp <= 0){
    playerLost();
  }

  // command()
};

const playerWon = () => {
  console.log(`${enemy.name}との\nしょうぶに　かった！`);
  battleAfter();
};

const playerLost = () => {
  console.log(`${player.name}は\nまけてしまった`);
  battleAfter();
};

const battleAfter = () => {
  console.log("battleAfter");
};