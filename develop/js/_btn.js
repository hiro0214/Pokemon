export const btnClick = () => {
  document.querySelector('.gameboy__key--up').onclick = () => {
    btnUpAction()
  }
  document.querySelector('.gameboy__key--left').onclick = () => {
    btnLeftAction()
  }
  document.querySelector('.gameboy__key--right').onclick = () => {
    btnRightAction()
  }
  document.querySelector('.gameboy__key--down').onclick = () => {
    btnDownAction()
  }
  document.querySelector('.btnA').onclick = () => {
    btnAAction()
  }
  document.querySelector('.btnB').onclick = () => {
    btnBAction()
  }
}

export const keyAction = () => {
  window.addEventListener('keydown', (e) => {
    if (e.key == "ArrowUp") {
      btnUpAction()
    }
    else if (e.key == "ArrowLeft") {
      btnLeftAction()
    }
    else if (e.key == "ArrowRight") {
      btnRightAction()
    }
    else if (e.key == "ArrowDown") {
      btnDownAction()
    }
    else if (e.key == "a") {
      btnAAction()
    }
    else if (e.key == "b") {
      btnBAction()
    }
  })
}

const btnUpAction = () => {
  console.log('up')
}

const btnLeftAction = () => {
  console.log('left')
}

const btnRightAction = () => {
  console.log('right')
}

const btnDownAction = () => {
  console.log('down')
}

const btnAAction = () => {
  console.log('A')
}

const btnBAction = () => {
  console.log('B')
}