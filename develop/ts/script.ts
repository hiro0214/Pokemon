import * as frame from './_frame';
import { textWindow } from './_text';
import { btnClick, keyAction } from './_btn';
import { MemberObj } from './_interface';
import { _p_minHp, _e_minHp, $p_minHpArea, generateStar, generatePoke, insertElement, damageHit } from './_element';
import { commandIn, commandOut, textWindowIn, textWindowOut } from './_window';
import { randomInt } from './_utility';

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

type GameState =
  | 'opening'
  | 'title'
  | 'field'
  | 'battleBefore'
  | 'battleFlow'
  | 'battleAfter'

type Member = 'player' | 'enemy';

export let
  gameState: GameState = 'battleBefore',

  screen: HTMLDivElement,

  $p_p, // Player's current Pokemon alias.
  $e_p, // Enemy's current Pokemon alias.

  $p_minHp: number,
  $e_minHp: number,

  firstAttack: Member,
  secondAttack: Member,

  player: MemberObj = {
    name: 'サトシ',
    pokemon: [],
    current: 0
  },

  enemy: MemberObj = {
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
  meterAnimate = (tar: Member, damage: number) => {
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
        }, 45);
      }())
    })
  },

  trickCompatibilityText = (num: number) => {
    return new Promise((res) => {
      if (num == 0) {
        textWindow('こうかが ないみたいだ')
      }
      else if (num < 1) {
        textWindow('こうかは いまひとつの ようだ')
      }
      else if (num > 1) {
        textWindow('こうかは ばつぐんだ!')
      }
      setTimeout(() => {
        res()
      }, 2500);
    })
  },

  criticalHitText = () => {
    return new Promise((res) => {
      textWindow('きゅうしょに あたった!')
      setTimeout(() => {
        res()
      }, 2500);
    })
  },

  speedCheck = (p_s: number, e_s: number) => {
    if (p_s >= e_s) {
      firstAttack = 'player'
      secondAttack = 'enemy'
    }
    else if (p_s <= e_s) {
      firstAttack = 'enemy'
      secondAttack = 'player'
    }
  },

  hpCheck = (target_p) => {
    if ($p_minHp <= 0 ) {
      textWindow(`${target_p.name}は たおれた!`)
      return false
    }
    else if ($e_minHp <= 0) {
      textWindow(`てきの ${target_p.name}は たおれた!`)
      return false
    }
    else {
      return true
    }
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
    case 'battleFlow': battleFlow(); break;
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
  player.pokemon.push(generatePoke(0))
  console.log(player.pokemon);
  enemy.pokemon.push(generatePoke(2))
  console.log(enemy.pokemon);

  screen.innerHTML = frame.battleFrame
  battleAlias()

  console.log(`${enemy.name}が\nしょうぶを しかけてきた！`);
  console.log(`${player.name}は\n${$p_p.name}を くりだした！`);
  console.log(`${enemy.name}は\n${$e_p.name}を くりだした！`);

  insertElement()
  battleVariable()

  changeState('battleFlow');
};

const battleProcess = (member: Member, trickIndex?) => {
  let
    actor_p,
    target_p,
    target: Member = member == 'player' ? 'enemy' : 'player';

  if (target == 'player') {
    actor_p = $e_p
    target_p = $p_p
  }
  else if (target == 'enemy') {
    actor_p = $p_p
    target_p = $e_p
  }

  if (!trickIndex) trickIndex = randomInt(3)

  target == 'enemy' ?
    textWindow(`${actor_p.name}の\n${actor_p.tricks[trickIndex].name}!`):
    textWindow(`てきの ${actor_p.name}の\n${actor_p.tricks[trickIndex].name}!`);

  return new Promise((res, rej) => {
    actor_p.behaivor(actor_p, target_p, actor_p.tricks[trickIndex])

    .then((result) => {
      const
        damage = result[0],
        magnification = result[1],
        critical = result[2];
      damageHit(target)
        .then(() => {
          return meterAnimate(target, damage)
        })
        .then(() => {
          if (magnification != 1) return trickCompatibilityText(magnification)
        })
        .then(() => {
          if (critical == 1.5) return criticalHitText()
        })
        .then(() => {
          hpCheck(target_p) ?
            res():
            setTimeout(() => {
              rej()
            }, 2500);
        })
    })

    .catch(() => {
      textWindow(`しかし ${actor_p.name}の\nこうげきは はずれた!`)
      setTimeout(() => {
        res()
      }, 2500);
    })
  })
}

export const battleFlow = (trickIndex?: string) => {
  if (!trickIndex) return commandIn();

  commandOut(trickIndex)
  textWindowIn()

  speedCheck($p_p.speed, $e_p.speed)

  const
    fa = firstAttack == 'player' ?
      () => battleProcess(firstAttack, trickIndex):
      () => battleProcess(firstAttack),
    sa = secondAttack == 'player' ?
      () => battleProcess(secondAttack, trickIndex):
      () => battleProcess(secondAttack);

  fa()
    .then(() => {
      sa()
        .then(() => {
          commandIn()
          textWindowOut()
        })
        .catch(() => {
          gameFinish()
        })
    })
    .catch(() => {
      gameFinish()
    })
};

const gameFinish = () => {
  if ($e_minHp <= 0) {
    textWindow(`${enemy.name}との\nしょうぶに かった!`);
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