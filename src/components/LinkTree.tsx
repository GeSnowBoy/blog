import * as React from 'react';
import * as marked from 'marked';
import { Anchor } from 'antd';

const { Link } = Anchor;
let div = document.createElement('div');
interface AnchorLinkModel {
  nodeName: string;
  text: string;
  link: string;
}
interface NodeTreeData {
  data: AnchorLinkModel;
  children: NodeTreeData[];
}
function getNodeList(els) {
  let treeNodes: AnchorLinkModel[] = [];
  elementMap(els, function(el) {
    if (isHeaderEl(el)) {
      treeNodes.push({
        nodeName: el.nodeName,
        text: el.innerText,
        link: el.id
      });
    }
    if (el.children) {
      let temp = getNodeList(el.children);
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
function getHeaderLevel(headerName: string) {
  return parseInt(headerName.replace(/[^\d]/g, ''));
}

function getNodeTree(els) {
  return _getNodeTree(getNodeList(els));

  function _getNodeTree(list): NodeTreeData[] {
    let result = [];
    if (list.length) {
      let helpLevel = getHeaderLevel(list[0].nodeName);
      let helpIndex = 0;
      for (let index = 0; index < list.length; index++) {
        let item = list[index];
        let curLevel = getHeaderLevel(item.nodeName);
        let isLast = index == list.length - 1;
        if (curLevel <= helpLevel && index != helpIndex) {
          let temp = list.slice(helpIndex + 1, index);
          result.push({
            data: list[helpIndex],
            children: _getNodeTree(temp)
          });
          helpLevel = getHeaderLevel(list[index].nodeName);
          helpIndex = index;
          if (!isLast) continue;
        }
      }
      let temp = list.slice(helpIndex + 1, list.length);
      result.push({
        data: list[helpIndex],
        children: _getNodeTree(temp)
      });
    }

    return result;
  }
}
export default function LinkTree({ md }: { md: string }) {
  let temp = marked(md);
  div.innerHTML = temp;

  let treeData = getNodeTree(div.childNodes);
  let TreeLink = function(data: NodeTreeData[]) {
    return data.map(({ children, data }) => {
      return (
        <Link href={`#${data.link}`} title={data.text} key={data.link}>
          {TreeLink(children)}
        </Link>
      );
    });
  };

  return (
    <Anchor
      offsetTop={170}
      onClick={e => {
        e.preventDefault();
      }}
    >
      {TreeLink(treeData)}
    </Anchor>
  );
}
