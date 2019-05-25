import * as React from 'react';
import * as marked from 'marked';
import { Anchor } from 'antd';

const { Link } = Anchor;
let div = document.createElement('div');

function getListTree(els) {
  let treeNodes: { nodeName: string; text: string; link: string }[] = [];
  elementMap(els, function(el) {
    if (isHeaderEl(el)) {
      treeNodes.push({
        nodeName: el.nodeName,
        text: el.innerText,
        link: el.id
      });
    }
    if (el.children) {
      let temp = getListTree(el.children);
      if (temp.length) {
        treeNodes = treeNodes.concat(temp);
      }
    }
  });
  return treeNodes;
}
function elementMap(els, fn) {
  for (var i = 0; i < els.length; i++) {
    fn(els[i], i, els);
  }
}
function isHeaderEl(el) {
  return Object.keys(new Array(6).fill(1))
    .map(i => `H${1 + +i}`)
    .includes(el.nodeName);
}

export default function LinkTree({ md }: { md: string }) {
  let temp = marked(md);
  div.innerHTML = temp;
  let links = getListTree(div.childNodes);

  return (
    <Anchor
      offsetTop={170}
      onClick={e => {
        e.preventDefault();
      }}
    >
      {links.map(link => {
        return (
          <Link href={`#${link.link}`} title={link.text} key={link.link} />
        );
      })}
    </Anchor>
  );
}
