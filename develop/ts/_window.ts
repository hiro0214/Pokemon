import { trickColumn} from './_element';
import { addClass, removeClass } from './_utility';

export const commandIn = () => {
  addClass('trickColumn', 'show')
  trickColumn.children[0].classList.add('current')
}

export const commandOut = (i: string) => {
  removeClass('trickColumn', 'show')
  trickColumn.children[i].classList.remove('current')
}

export const textWindowIn = () => {
  addClass('textBox', 'show')
}

export const textWindowOut = () => {
  removeClass('textBox', 'show')
}
