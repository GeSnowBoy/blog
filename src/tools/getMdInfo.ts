import * as marked from 'marked';
let div = document.createElement('div');
export function getMdInfo(md) {
  let temp = marked(md);
  div.innerHTML = temp;
  let text = div.innerText;
  let maxLenght = 300;
  return {
    md,
    introduction:
      text.length > maxLenght ? text.substr(0, maxLenght) + '...' : text,
    text,
    length: text.length
  };
}
