const typeData = require('../json/type.json');
import { Pokemonable, Trickable } from './_interface';
import { randomInt } from './_utility';

enum StatusAilment {
  Burn,           // やけど
  Freeze,         // こおり
  Paralysis,      // マヒ
  Poison,         // どく
  Sleep,          // ねむり
  Confusion       // こんらん
}


const pokemonTypeCheck = (at1: string, at2: string, t: string): number => {
  return at1 === t || at2 === t ? 1.5 : 1;
}

const trickCompatibility = (t: string): [string?][] => {
  return typeData[t];
}

const isCritical = (trick: string) => {
  if (trick == 'きりさく' || trick == 'はっぱカッター') {
    return randomInt(255) <= 63 ? true : false
  }
  else {
    return randomInt(255) <= 16 ? true : false
  }
}

const trickTypeCheck = (tt1: string, tt2: string, t: string): number => {
  const list = trickCompatibility(t)

  const compatibilityRatio = (et: string) => {
    const compatibilityArray = Object.values(list).map(e => {
      return e.some(type => type === et)
    })

    switch (compatibilityArray.findIndex(i => i === true)) {
      case -1: return 1;
      case 0: return 2;
      case 1: return 0.5;
      case 2: return 0;
    }
  }

  const type2: number = tt2 ? compatibilityRatio(tt2): 1;
  return compatibilityRatio(tt1) * type2;
}

const calcDamage = (attack: number, defense: number, power: number): number => {
  return ((((50 * 2 / 5) + 2) * (attack * power / defense) / 50) + 2) * (1 - (randomInt(15) / 100))
}

export class Pokemon implements Pokemonable {
  statusAilment: StatusAilment;
  constructor(
    readonly name: string,
    readonly text: string,
    public hp: number,
    public attack: number,
    public defense: number,
    public speed: number,
    public spAtk: number,
    public spDef: number,
    readonly type1: string,
    readonly type2: string,
    readonly tricks: Trickable[],
  ) {
    this.statusAilment = null
  }

  private hitDecision(trick: number): boolean {
    return randomInt(99) <= trick ? true : false;
  }

  behaivor(a: Pokemonable, t: Pokemonable, trick: Trickable) {
    return new Promise((res, rej) => {
      setTimeout(() => {

      // ①命中判定
      if (!this.hitDecision(trick.accuracy)) return rej();

      // ②威力計算
      // ②-1: ポケモンタイプ判定
      const
        ptMagnification = pokemonTypeCheck(a.type1, a.type2, trick.type),

      // ②-2: 技タイプ判定
        ttMagnification = trickTypeCheck(t.type1, t.type2, trick.type),

      // ②-3: 急所判定
        criticalMagnification = isCritical(trick.name) ? 1.5 : 1,

      // ②-4: 技種類判定
        a_attack = trick.category === 'physics' ? a.attack : a.spAtk,
        t_defense = trick.category === 'physics' ? t.defense : t.spDef;

      // ③状態異常判定



      // ④ レスポンス
        res([
          Math.floor(calcDamage(a_attack, t_defense, trick.power) * ptMagnification * ttMagnification * criticalMagnification),
          ttMagnification,
          criticalMagnification
        ])
      }, 2000);
    })
  }
}