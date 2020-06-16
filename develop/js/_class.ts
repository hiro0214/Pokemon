export default class Pokemon {
  constructor(
    readonly name: string,
    public hp: number,
    public attack: number,
    public deffence: number,
    public speed: number,
    public spAtk: number,
    public spDef: number,
    public type1: string,
    public type2: string,
    public tricks: []
  ) {

  }
}