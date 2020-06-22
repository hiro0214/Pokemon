const pokemonData = require("../json/data.json");
const trick = require("../json/trick.json");
import textWindow from "./_text";
import Pokemon from "./_class";
import * as btn from "./_btn";

document.addEventListener("DOMContentLoaded", () => {
  changeURL();
  btn.btnClick();
  btn.keyAction();
  changeDisplay();

  // bgmLoop()
  conditionalBranch();
});

const changeDisplay = () => {
  document.getElementById("change").onclick = () => {
    const status = document.querySelectorAll(".status-block");
    Array.prototype.forEach.call(status, (ele) => {
      if (ele.getAttribute("state") === "ball") {
        ele.setAttribute("state", "status");
      } else {
        ele.setAttribute("state", "ball");
      }
    });
  };
};



/* ==========================
  Global Variable
=========================== */

let
  gameState = "opening",
  winner = "player",

  player = {
    name: "サトシ",
    pokemon: [],
  },
  enemy = {
    name: "タケシ",
    pokemon: [],
  };



/* ==========================
  Function Definition
=========================== */

const
  setAttr = (tar, attr, value) => document.getElementById(tar).setAttribute(attr, value),
  addClass = (tar, className) => document.getElementById(tar).classList.add(className),
  removeClass = (tar, className) => document.getElementById(tar).classList.remove(className),

  getTrick = id => trick[id],
  generatePoke = id => {
    let trickData = [],
      poke = pokemonData[id];
    for (let i in poke.tricks) {
      trickData.push(getTrick(i));
    }
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
  console.log("opening");

  /* ================================
    Some kind of opening processing
  ================================= */

  changeState("title");
};

const title = () => {
  console.log("title");

  /* ================================
    Some kind of title processing
  ================================= */

  changeState("field");
};

const field = () => {
  console.log("field");

  /* ================================
    Some kind of field processing
  ================================= */

  changeState("battleBefore");
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

  changeState("battle");
};

const battleProcess = () => {
  console.log(`${enemy.name}が\nしょうぶを　しかけてきた！`);

  console.log(`${player.name}は\n${player.pokemon.name}を　くりだした！`);
  console.log(`${enemy.name}は\n${enemy.pokemon.name}を　くりだした！`);

  /* ================================
    Some kind of battle processing
  ================================= */

  if (winner == "player") {
    playerWon();
  } else {
    playerLost();
  }
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
