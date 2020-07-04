const pokemonData = require('../json/data.json');
const trickData = require('../json/trick.json');

import * as v from './script';
import { Pokemonable, Trickable } from './_interface';
import { multipleSetAttr} from './_utility';
import { Pokemon } from './_pokemon';

export let
  trickColumn: HTMLDivElement,

  _p_minHp: number,
  $p_maxHp: number,
  _e_minHp: number,
  $e_maxHp: number,
  $p_minHpArea: HTMLDivElement,
  $p_maxHpArea: HTMLDivElement;


export const generateStar = (color: string, i, left: number): HTMLDivElement => {
  const ele = document.createElement('div')
  ele.classList.add('star')
  ele.style.borderBottom = `10px solid ${color}`;
  ele.style.left = `${left + (i * 70)}px`
  return ele;
}

const getTrick = (id: number): Trickable => {
  return trickData[id]
}

const generateImg = (name: string, text: string): HTMLImageElement => {
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
}

const generateMeterData = (val: number) => {
  return [
    ['value', val],
    ['low', (val / 5)],
    ['high', (val / 2)],
    ['max', val],
    ['optimum', val],
  ]
}

const generateMeter = (tar: string, hp: number) => {
  const ele = document.querySelector(`#${tar} meter`)
  multipleSetAttr(ele, generateMeterData(hp))

  if (tar == 'player') {
    $p_maxHp = hp
    _p_minHp = hp
    $p_maxHpArea = document.querySelector('.pokemon-content__maxHp')
    $p_minHpArea = document.querySelector('.pokemon-content__minHp')
    $p_maxHpArea.textContent = String($p_maxHp)
    $p_minHpArea.textContent = String(_p_minHp)
  }
  else if (tar = 'enemy') {
    $e_maxHp = hp
    _e_minHp = hp
  }
}

export const insertElement = () => {
  const
    playerArea = <HTMLDivElement>document.getElementById('player'),
    enemyArea = <HTMLDivElement>document.getElementById('enemy');
  trickColumn = <HTMLDivElement>document.getElementById('trickColumn')

  playerArea.children[0].textContent = v.$p_p.name
  enemyArea.children[0].textContent = v.$e_p.name

  playerArea.children[1].appendChild(generateImg('player', v.$p_p.text))
  enemyArea.children[1].appendChild(generateImg('enemy', v.$e_p.text))

  generateMeter('player', v.$p_p.hp)
  generateMeter('enemy', v.$e_p.hp)

  v.$p_p.tricks.forEach(ele => {
    const trickContent = document.createElement('li')
    trickContent.textContent = ele.name
    trickColumn.appendChild(trickContent)
  })
}

export const generatePoke = (id: number) => {
  let
    trickEle: Trickable[] = [],
    poke: Pokemonable = pokemonData[id];

  poke.tricks.forEach((i) => {
    trickEle.push(getTrick(i));
  })
  poke.tricks = trickEle;
  return new Pokemon(poke.name, poke.text, poke.hp, poke.attack, poke.defense, poke.speed, poke.spAtk, poke.spDef, poke.type1, poke.type2, poke.tricks)
}