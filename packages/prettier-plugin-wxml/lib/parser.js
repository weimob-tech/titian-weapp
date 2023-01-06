/* eslint-disable */
const htmlparser2 = require('htmlparser2');
const wxmlParser = (source, options) => wxmlParser.parse(source, options);

const generateSpace = (count) => {
  let space = '';
  for (let i = 0; i < count; i++) {
    space += ' ';
  }
  return space;
};

const convertAttr = (key, value) => {
  const newKey = key.replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`);
  const newValue = value
    .replace(/(\{\{)([a-zA-z0-9\s().{}?:\[\]'"|#<>\-,=]*?)(}})/g, (match, p0, p1, p2) => {
      const ret = p1
        .replace(/\s*(:|\?)\s*/g, ' $1 ') // 冒号和问号 两边加空格
        .replace(/({)(.*)(\})/, (m, p0, p1, p2) => {
          p1 = p1
            .split(',')
            .map((i) => i.trim().replace(/\s*:\s*/, ': '))
            .join(', ');
          return `${p0}${p1}${p2}`;
        })
        .replace(/\s*(===?)\s*/g, ' $1 ') // 等于号 两边加空格
        .replace(/\s*([\]}])\s*/g, ' $1') // 右中、右大括号 左边加空格
        .replace(/([(])\s*/g, '$1') // 左小括号 右边去空格
        .replace(/\s*([)])/g, '$1') // 右小括号 左边去空格
        .replace(/\s*([,\[{])\s*/g, '$1 '); // 逗号、左中、左大括号 右边加空格 // 大括号内的属性值，每个属性值右边加空格
      return `${p0}${ret}${p2}`;
    })
    .replace(/\s+({{)/g, ' $1')
    .replace(/(}})\s+/g, '$1 ');
  return `${newKey}${value === '' ? '' : `="${newValue}"`}`;
};

const findEndTag = (stack, openTag) => {
  for (let i = 0; i < stack.length; i++) {
    const cur = stack[i];
    if (cur.type === 'comment' || cur.type === 'openTag') {
      return false;
    }

    if (cur.type === 'text') {
      if (cur.text.trim() !== '') {
        return false;
      }
    }

    if (cur.type === 'closeTag') {
      if (cur.name === openTag.name || cur.isImplied) {
        return true;
      }
    }
  }
};

wxmlParser.parse = (source, options) => {
  const stack = [];

  /** 将close标签和open标签的建立关联 */
  const connectRelation = (node, isImplied) => {
    let i = stack.length - 1;
    while (i >= 0) {
      const prevNode = stack[i];
      if (prevNode.type === 'openTag' && prevNode.name === node.name && prevNode.closeTag === undefined) {
        if (prevNode.spaceLength > 0) {
          node.spaceLength = prevNode.spaceLength;
        }
        prevNode.isImplied = isImplied;
        prevNode.closeTag = node;
        node.openTag = prevNode;
        break;
      }
      i--;
    }
  };

  const parser = new htmlparser2.Parser(
    {
      onopentagname(name) {
        const obj = { type: 'openTag', name, spaceLength: 0 };
        const node = stack[stack.length - 1];
        if (node?.type === 'text') {
          const _str = node.text.replace(/(^\n*)|(\n*$)/g, '');
          if (_str !== '') {
            obj.spaceLength = node.spaceLength;
          }
        }
        stack.push(obj);
      },
      ontext(text) {
        const newText = text.replace(/(^ *)|( *$)/g, '');

        text = text.replace(/\n{3,}/g, '\n\n');
        const obj = { type: 'text', text, spaceLength: 0 };
        let hasRet = false;
        text.replace(/\n+( *)/, (s, p) => {
          hasRet = true;
          obj.spaceLength = Math.max(obj.spaceLength, p.length);
        });

        if (hasRet) {
          if (!newText.startsWith('\n')) {
            obj.text = `\n${generateSpace(obj.spaceLength)}${obj.text}`;
          }
          if (!newText.endsWith('\n')) {
            obj.text = `${obj.text}\n${generateSpace(Math.max(obj.spaceLength - 2, 0))}`;
          }
        }
        stack.push(obj);
      },
      onclosetag(name, isImplied) {
        const obj = { type: 'closeTag', name, isImplied, spaceLength: 0 };

        connectRelation(obj, isImplied);
        stack.push(obj);
      },
      oncomment(data) {
        const obj = { type: 'comment', data };
        stack.push(obj);
      },
      onattribute(name, value, quote) {
        const prevNode = stack[stack.length - 1];
        if (prevNode?.type === 'attribute') {
          prevNode.value.push(convertAttr(name, value));
        } else {
          const attr = {
            type: 'attribute',
            value: [convertAttr(name, value)],
            spaceLength: prevNode.spaceLength,
            tagName: prevNode.name,
            openTag: prevNode
          };
          prevNode.attr = attr;
          stack.push(attr);
        }
      }
    },
    {
      xmlMode: true
    }
  );

  parser.write(source); // 转换元素节点
  parser.end();

  const tagNameStack = [];
  let result = '';

  while (stack.length) {
    const node = stack.shift();
    if (node.type === 'openTag') {
      const isImplied = findEndTag(stack, node);
      node.closeTag.isImplied = isImplied;
      node.isImplied = isImplied;
      if (tagNameStack.length > 0 && !tagNameStack[tagNameStack.length - 1].isImplied) {
        result += '>';
        tagNameStack.pop();
      }

      tagNameStack.push(node);
      result += `<${node.name}`;
    } else if (node.type === 'closeTag') {
      const needWrap = node.openTag.needWrap || false; // 是否需要换行
      const space = needWrap ? `\n${generateSpace(node.spaceLength)}` : node.isImplied ? ' ' : '';
      node.openTag.needWrap = false;
      result += space;

      if (node.isImplied) {
        result += '/>';
      } else {
        result += `</${node.name}>`;
      }
      tagNameStack.pop();
    } else if (node.type === 'text') {
      if (tagNameStack.length > 0) {
        const openNode = tagNameStack.pop();
        if (openNode.isImplied && node.text.trim() === '') {
          continue;
        }
        const needWrap = openNode.needWrap || false; // 是否需要换行
        const space = needWrap ? `\n${generateSpace(openNode.spaceLength)}` : '';
        result += space;
        openNode.needWrap = false;
        result += '>';
      }
      result += node.text;
    } else if (node.type === 'comment') {
      result += `<!--${node.data}-->`;
    } else if (node.type === 'attribute') {
      const expectStrLength = `<${node.tagName} ${node.value.join(' ')} >`.length + 1;
      const needWrap = node.value.length > 4 || expectStrLength >= options.printWidth;
      let attrStr = '';

      if (node?.openTag) {
        node.openTag.needWrap = needWrap;
      }

      if (needWrap) {
        attrStr = `\n${generateSpace(node.spaceLength + 2)}`.concat(
          node.value.join(`\n${generateSpace(node.spaceLength + 2)}`)
        );
      } else {
        attrStr = ' '.concat(node.value.join(' '));
      }

      result += `${attrStr}`;
    }
  }
  return result;
};

module.exports = {
  wxmlParser
};
