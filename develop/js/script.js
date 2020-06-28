const pokemonData = require("../json/data.json");
const trickData = require("../json/trick.json");
import textWindow from "./_text";
import Pokemon from "./_class";
import * as btn from "./_btn";
import * as frame from "./_frame";

document.addEventListener("DOMContentLoaded", () => {
  changeURL();
  btn.btnClick();
  btn.keyAction();

  // bgmLoop()
  globalVariable();
  conditionalBranch();
});


/* ==========================
  Global Variable
=========================== */

let
  gameState = "battleBefore",

  playerArea,
  enemyArea,
  trickColumn,

  player = {
    name: "サトシ",
    pokemon: [],
  },
  enemy = {
    name: "タケシ",
    pokemon: [],
  };

const
  globalVariable = () => {
    screen = document.getElementById('screen')
  },

  battleVariable = () => {
    playerArea = document.getElementById('player')
    enemyArea = document.getElementById('enemy')
    trickColumn = document.getElementById('trickColumn')
  };

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

  getTrick = id => trickData[id],
  generatePoke = id => {
    let trickEle = [],
      poke = pokemonData[id];
    poke.tricks.forEach((i) => {
      trickEle.push(getTrick(i));
    })
    poke.tricks = trickEle;
    let args = Object.values(poke);
    return new Pokemon(...args);
  },

  generateImg = (name, text) => {
    const
      img = document.createElement('img'),
      path = "./assets/images/";

    if (name == "player") {
      img.src = `${path + text}_b.png`
      return img;
    }
    else if (name == "enemy") {
      img.src = `${path + text}_f.png`
      return img;
    }
  },

  insertElement = () => {
    playerArea.children[0].textContent = player.pokemon.name
    enemyArea.children[0].textContent = enemy.pokemon.name

    playerArea.children[1].appendChild(generateImg('player', player.pokemon.text))
    enemyArea.children[1].appendChild(generateImg('enemy', enemy.pokemon.text))

    playerArea.children[3].children[1].textContent = player.pokemon.hp

    player.pokemon.tricks.forEach(ele => {
      const trickContent = document.createElement('li')
      trickContent.textContent = ele.name
      trickColumn.appendChild(trickContent)
    })
  },

  commandIn = () => {
    addClass('trickColumn', 'show')
    trickColumn.children[0].classList.add('current')
  },
  commandOut = i => {
    removeClass('trickColumn', 'show')
    trickColumn.children[i].classList.remove('current')
  },

  textWindowIn = i => {
    addClass('textBox', 'show')
    textWindow(`${player.pokemon.name}の\n${player.pokemon.tricks[i].name}!`)
  },
  textWindowOut = () => removeClass('textBox', 'show'),

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
  player.pokemon = generatePoke(0);
  console.log(player.pokemon);
  enemy.pokemon = generatePoke(1);
  console.log(enemy.pokemon);

  screen.innerHTML = frame.battleFrame
  battleVariable()

  console.log(`${enemy.name}が\nしょうぶを　しかけてきた！`);
  console.log(`${player.name}は\n${player.pokemon.name}を　くりだした！`);
  console.log(`${enemy.name}は\n${enemy.pokemon.name}を　くりだした！`);

  insertElement()
  changeState("battle");
};

export const battleProcess = trickIndex => {
  if (!trickIndex) {
    commandIn()
    return;
  }

  commandOut(trickIndex)
  textWindowIn(trickIndex)

  // ダメージ処理
  // pokemon.attack()

  if (enemy.pokemon.hp <= 0) {
    playerWon();
  }
  else if (player.pokemon.hp <= 0){
    playerLost();
  }

  setTimeout(() => {
    commandIn()
    textWindowOut()
  }, 2500);
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