import { Pokemonable, Trickable } from './_interface';

enum StatusAilment {
  Burn,           // やけど
  Freeze,         // こおり
  Paralysis,      // マヒ
  Poison,         // どく
  Sleep,          // ねむり
  Confusion       // こんらん
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
}