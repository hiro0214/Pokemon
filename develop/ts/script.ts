import * as frame from './_frame';
import { textWindow } from './_text';
import { btnClick, keyAction } from './_btn';
import { Member } from './_interface';
import { _p_minHp, _e_minHp, $p_minHpArea,  generateStar, generatePoke, insertElement} from './_element';
import { commandIn, commandOut, textWindowIn, textWindowOut } from './_window';

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

export let
  gameState: GameState = 'battleBefore',

  screen: HTMLDivElement,

  $p_p, // Player's current Pokemon alias.
  $e_p, // Enemy's current Pokemon alias.

  $p_minHp: number,
  $e_minHp: number,

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

  battleAlias = () => {
    $p_p = player.pokemon[player.current];
    $e_p = enemy.pokemon[enemy.current];
  },

  battleVariable = () => {
    $p_minHp = _p_minHp;
    $e_minHp = _e_minHp;
  };



/* ==========================
  Function Definition
=========================== */

const
  meterAnimate = (tar: 'player' | 'enemy', damage: number) => {
    const
      meter: HTMLMeterElement = document.querySelector(`#${tar} meter`),
      after: number = meter.value - damage;

    return new Promise((res) => {
      (function damageStep() {
        if (meter.value <= after) {
          res()
          return;
        }
        setTimeout(() => {
          meter.value -= 1
          if (tar == 'player') {
            $p_minHp -= 1
            $p_minHpArea.textContent = String(meter.value)
          }
          else if (tar = 'enemy') {
            $e_minHp -= 1
          }

          if (meter.value <= 0) {
            res()
            return;
          }
          else {
            damageStep()
          }
        }, 25);
      }())
    })
  },

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
  player.pokemon.push(generatePoke(1))
  console.log(player.pokemon);
  enemy.pokemon.push(generatePoke(2))
  console.log(enemy.pokemon);

  screen.innerHTML = frame.battleFrame
  battleAlias()

  console.log(`${enemy.name}が\nしょうぶを　しかけてきた！`);
  console.log(`${player.name}は\n${$p_p.name}を　くりだした！`);
  console.log(`${enemy.name}は\n${$e_p.name}を　くりだした！`);

  insertElement()
  battleVariable()

  changeState('battleProcess');
};

export const battleProcess = (trickIndex?: string) => {
  if (!trickIndex) {
    commandIn()
    return;
  }

  commandOut(trickIndex)
  textWindowIn()
  textWindow(`${$p_p.name}の\n${$p_p.tricks[trickIndex].name}!`)

  // ダメージ処理
  // pokemon.attack()

  meterAnimate('player', 90)
  .then(() => {
    if ($e_minHp <= 0 || $p_minHp <= 0) {
      setTimeout(() => {
        gameFinish();
      }, 1500);
    } else {
      setTimeout(() => {
        commandIn()
        textWindowOut()
      }, 1500);
    }
  })
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