const pokemonData = require('../json/data.json');
const trickData = require('../json/trick.json');

import { textWindow } from './_text';
import { btnClick, keyAction} from './_btn';
import * as frame from './_frame';
import { Member, Pokemonable, Trickable } from './_interface';
import { Pokemon } from './_pokemon';

document.addEventListener('DOMContentLoaded', () => {
  changeURL();
  btnClick();
  keyAction();

  // bgmLoop()
  globalVariable();
  conditionalBranch();
});


/* ==========================
  Global Variable
=========================== */


type GameState = 'opening' | 'title' | 'field' | 'battleBefore' | 'battleProcess' | 'battleAfter';

let
  gameState: GameState = 'battleBefore',

  screen: HTMLDivElement,
  playerArea: HTMLDivElement,
  enemyArea: HTMLDivElement,
  trickColumn: HTMLDivElement,

  $p_p, // Player's current Pokemon alias.
  $e_p, // Enemy's current Pokemon alias.

  $p_minHp: number,
  $p_maxHp: number,

  $e_minHp: number,
  $e_maxHp: number,

  player: Member = {
    name: 'サトシ',
    pokemon: [],
    current: 0
  },

  enemy: Member = {
    name: 'タケシ',
    pokemon: [],
    current: 0
  };



const
  globalVariable = () => {
    screen = <HTMLDivElement>document.getElementById('screen')
  },

  battleVariable = () => {
    playerArea = <HTMLDivElement>document.getElementById('player')
    enemyArea = <HTMLDivElement>document.getElementById('enemy')
    trickColumn = <HTMLDivElement>document.getElementById('trickColumn')

    $p_p = player.pokemon[player.current];
    $e_p = enemy.pokemon[enemy.current];
  };



/* ==========================
  Function Definition
=========================== */

const
  setAttr = (tar: string, attr: string, value: string) => document.getElementById(tar).setAttribute(attr, value),
  addClass = (tar: string, className: string) => document.getElementById(tar).classList.add(className),
  removeClass = (tar: string, className: string) => document.getElementById(tar).classList.remove(className),

  generateStar = (color: string, i, left: number): HTMLDivElement => {
    const ele = document.createElement('div')
    ele.classList.add('star')
    ele.style.borderBottom = `10px solid ${color}`;
    ele.style.left = `${left + (i * 70)}px`
    return ele;
  },

  getTrick = (id: number): Trickable => trickData[id],
  generatePoke = (id: number) => {
    let
      trickEle: Trickable[] = [],
      poke: Pokemonable = pokemonData[id];

    poke.tricks.forEach((i) => {
      trickEle.push(getTrick(i));
    })
    poke.tricks = trickEle;
    return new Pokemon(poke.name, poke.text, poke.hp, poke.attack, poke.defense, poke.speed, poke.spAtk, poke.spDef, poke.type1, poke.type2, poke.tricks)
  },

  generateImg = (name: string, text: string): HTMLImageElement => {
    const
      img = document.createElement('img'),
      path = './assets/images/';

    if (name == 'player') {
      img.src = `${path + text}_b.png`
      return img;
    }
    else if (name == 'enemy') {
      img.src = `${path + text}_f.png`
      return img;
    }
  },


  insertElement = () => {
    playerArea.children[0].textContent = $p_p.name
    enemyArea.children[0].textContent = $e_p.name

    playerArea.children[1].appendChild(generateImg('player', $p_p.text))
    enemyArea.children[1].appendChild(generateImg('enemy', $e_p.text))

    $p_minHp = $p_p.hp
    $p_maxHp = $p_p.hp

    $e_minHp = $e_p.hp
    $e_maxHp = $e_p.hp

    playerArea.children[3].children[0].textContent = String($p_minHp)
    playerArea.children[3].children[1].textContent = String($p_maxHp)

    $p_p.tricks.forEach(ele => {
      const trickContent = document.createElement('li')
      trickContent.textContent = ele.name
      trickColumn.appendChild(trickContent)
    })
  },

  commandIn = () => {
    addClass('trickColumn', 'show')
    trickColumn.children[0].classList.add('current')
  },
  commandOut = (i: string) => {
    removeClass('trickColumn', 'show')
    trickColumn.children[i].classList.remove('current')
  },

  textWindowIn = (i: string) => {
    addClass('textBox', 'show')
    textWindow(`${$p_p.name}の\n${$p_p.tricks[i].name}!`)
  },
  textWindowOut = () => removeClass('textBox', 'show'),

  bgmLoop = () => {
    const bgm = new Audio('../audio/battle_loop.mp3')
    bgm.loop = true
    bgm.play()
  },

  changeURL = () => {
    let str;
    const num = Math.floor(Math.random() * (7 - 1)) + 1;
    if (num === 1) {
      str = '▴(｡◕ᴥ◕｡)▴';
    } else if (num === 2) {
      str = '⟅̀⁍̃◡⁌̃⟆́';
    } else if (num === 3) {
      str = 'ˆ⁍◡⁌ˆ';
    } else if (num === 4) {
      str = '⧫(◕ˑ̫◕)⧫';
    } else if (num === 5) {
      str = '⊃(◎)⊂';
    } else if (num === 6) {
      str = '╰(◕o◕)╮_=͟͟͞͞◒';
    }
    history.replaceState('', '', str);
  };


/* ==========================
  Processing Part
=========================== */

const conditionalBranch = () => {
  switch (gameState) {
    case 'opening': opening(); break;
    case 'title': title(); break;
    case 'field': field(); break;
    case 'battleBefore': battleBefore(); break;
    case 'battleProcess': battleProcess(); break;
    case 'battleAfter': battleAfter(); break;
  }
};

const changeState = (state: GameState) => {
  gameState = state
  conditionalBranch();
};

const opening = () => {
  screen.innerHTML = frame.openingFrame

  const
    target = document.getElementById('starPos'),
    color = ['#f3a68c', '#79c06e', '#ffe9a9', '#8da0b6'],
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
        star.style.left = pos + 'px'
        target.appendChild(star)
      }, time)
    }
  }

  setTimeout(() => {
    changeState('title');
  }, 23000)
};

const title = () => {
  console.log('title');

  /* ================================
    Some kind of title processing
  ================================= */

  screen.innerHTML = frame.titleFrame

  // changeState('field');
};

const field = () => {
  console.log('field');

  /* ================================
    Some kind of field processing
  ================================= */

  screen.innerHTML = frame.fieldFrame

  // changeState('battleBefore');
};

const battleBefore = () => {
  player.pokemon.push(generatePoke(2))
  console.log(player.pokemon);
  enemy.pokemon.push(generatePoke(1))
  console.log(enemy.pokemon);

  screen.innerHTML = frame.battleFrame
  battleVariable()

  console.log(`${enemy.name}が\nしょうぶを　しかけてきた！`);
  console.log(`${player.name}は\n${$p_p.name}を　くりだした！`);
  console.log(`${enemy.name}は\n${$e_p.name}を　くりだした！`);

  insertElement()
  changeState('battleProcess');
};

export const battleProcess = (trickIndex?: string) => {
  if (!trickIndex) {
    commandIn()
    return;
  }

  commandOut(trickIndex)
  textWindowIn(trickIndex)

  // ダメージ処理
  // pokemon.attack()

  if ($e_minHp <= 0 || $p_minHp <= 0) {
    setTimeout(() => {
      gameFinish();
    }, 2500);
  } else {
    setTimeout(() => {
      commandIn()
      textWindowOut()
    }, 2500);
  }
};

const gameFinish = () => {
  if ($e_minHp <= 0) {
    textWindow(`${enemy.name}との\nしょうぶに　かった!`);
  }
  else if ($p_minHp <= 0) {
    textWindow(`${player.name}は\nまけてしまった`);
  }
  setTimeout(() => {
    battleAfter();
  }, 2500)
};

const battleAfter = () => {
  console.log('battleAfter');
  screen.innerHTML = frame.battleAfterFrame
};