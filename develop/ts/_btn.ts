import { battleProcess } from './script';

export const btnClick = () => {
  document.querySelector('.gameboy__key--up').addEventListener('click', btnUpAction)
  document.querySelector('.gameboy__key--left').addEventListener('click', btnLeftAction)
  document.querySelector('.gameboy__key--right').addEventListener('click', btnRightAction)
  document.querySelector('.gameboy__key--down').addEventListener('click', btnDownAction)
  document.querySelector('.btnA').addEventListener('click', btnAAction)
  document.querySelector('.btnB').addEventListener('click', btnBAction)
}

export const keyAction = () => {
  window.addEventListener('keydown', (e) => {
    if (e.key == 'ArrowUp') {
      btnUpAction()
    }
    else if (e.key == 'ArrowLeft') {
      btnLeftAction()
    }
    else if (e.key == 'ArrowRight') {
      btnRightAction()
    }
    else if (e.key == 'ArrowDown') {
      btnDownAction()
    }
    else if (e.key == 'a') {
      btnAAction()
    }
    else if (e.key == 'b') {
      btnBAction()
    }
  })
}

const btnUpAction = () => {
  const list = document.querySelector('.current')
  list.classList.remove('current')
  if (list.previousElementSibling) {
    list.previousElementSibling.classList.add('current')
  } else {
    document.querySelector('.trick').lastElementChild.classList.add('current')
  }
}

const btnLeftAction = () => {
  console.log('left')
}

const btnRightAction = () => {
  console.log('right')
}

const btnDownAction = () => {
  const list = document.querySelector('.current')
  list.classList.remove('current')
  if (list.nextElementSibling) {
    list.nextElementSibling.classList.add('current')
  } else {
    document.querySelector('.trick').firstElementChild.classList.add('current')
  }
}

const btnAAction = () => {
  const current = document.getElementsByClassName('current')[0]

  // 技リストを決定する時のみのAボタンアクションのif文を後々追加
  const i = String(Array.prototype.indexOf.call(current.parentNode.querySelectorAll('li'), current))
  battleProcess(i)
}

const btnBAction = () => {
  console.log('B')
}