import { textWindow } from './_text';
import Pokemon from './_class';

document.addEventListener('DOMContentLoaded', () => {
  btnInit()
})

const btnInit = () => {
  document.querySelector('.btnA').onclick = () => {
    alert('Aボターン!')
  }
  document.querySelector('.btnB').onclick = () => {
    alert('Bボターン!')
  }
  document.querySelector('.gameboy__key--top').onclick = () => {
    alert('うえー')
  }
  document.querySelector('.gameboy__key--left').onclick = () => {
    alert('ひだりー')
  }
  document.querySelector('.gameboy__key--right').onclick = () => {
    alert('みぎー')
  }
  document.querySelector('.gameboy__key--bottom').onclick = () => {
    alert('したー！')
  }
}