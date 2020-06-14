import { textWindow } from './_text';
import Pokemon from './_class';

document.addEventListener('DOMContentLoaded', () => {
  text()
  poke()
})

const text = () => {
  document.getElementById('btn').onclick = () => {
    textWindow('hellooooooooooooooooooooooooo\naaaaaaabbbbbbbbbbbbcccccccccc')
  }
}

const poke = () => {
  const p = new Pokemon("pika")
  console.log(p.name);
}