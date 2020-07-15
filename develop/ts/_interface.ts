export interface MemberObj {
  name: string;
  pokemon: Pokemonable[];
  current: number; // 何番目のポケモンを選択しているかのindex。ポケモンを複数所持できるようになった時に使用する。
};

export interface Pokemonable {
  readonly name: string;
  readonly text: string;
  hp: number;
  attack: number;
  defense: number;
  speed: number;
  spAtk: number;
  spDef: number;
  readonly type1: string;
  readonly type2: string;
  tricks: Trickable[];
}

export interface Trickable {
  readonly name: string;
  readonly power: number;
  readonly accuracy: number;
  readonly type: string;
  readonly effect: string;
  readonly category: string;
}