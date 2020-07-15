export const setAttr = (tar: string, attr: string, value) => {
  document.getElementById(tar).setAttribute(attr, value)
}

export const multipleSetAttr = (tar, data: (string | number)[][]) => {
  for (let i = 0; i < data.length; i ++) {
    tar.setAttribute(data[i][0], data[i][1])
  }
}

export const addClass = (tar: string, className: string) => {
  document.getElementById(tar).classList.add(className)
}

export const removeClass = (tar: string, className: string) => {
  document.getElementById(tar).classList.remove(className)
}

export const randomInt = (range: number): number => {
  return Math.floor(Math.random() * (range + 1));
}
