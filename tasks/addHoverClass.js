const htmlparser2 = require('htmlparser2');
const render = require('dom-serializer').default;
const CSSselect = require('css-select');
const fs = require('fs-extra');
function addHoverClass(wxmlPath) {
  const ignoreList = [
    'transition',
    'calendar',
    'sticky',
    'picker',
    'toast',
    'dropdown',
    'share-sheet',
    'action-sheet',
    'tree-select',
    '-group',
    '-group',
    'grid/',
    'dialog',
    'textarea',
    'search',
    'popup'
  ];
  const ignore = ignoreList.some((el) => wxmlPath.includes(el));
  if (ignore) return;
  const wxml = fs.readFileSync(wxmlPath, 'utf8');
  const dom = htmlparser2.parseDocument(wxml, {
    xml: true,
    recognizeSelfClosing: true
  });
  let firstView = null;
  if (wxmlPath.includes('button')) {
    firstView = CSSselect.selectOne('button', dom);
  } else if (wxmlPath.includes('input-number')) {
    firstView = CSSselect.selectOne('.ext-minus-class', dom);
    const otheView = CSSselect.selectOne('.ext-plus-class', dom);
    otheView.attribs['hover-class'] = 'hover-titian-ui';
  } else {
    const view = CSSselect.selectAll('view', dom);
    if (!view[0]) return;
    // 待输入框的组件，hover-class会影响聚焦
    if (wxmlPath.includes('input')) {
      firstView = view[1];
    } else {
      firstView = view[0];
    }
  }
  if (!firstView) return;
  firstView.attribs['hover-class'] = 'hover-titian-ui';
  const serilzd = render(dom, { xmlMode: true, selfClosingTags: true, encodeEntities: false });
  fs.writeFileSync(wxmlPath, serilzd);
}
module.exports = {
  addHoverClass: addHoverClass
};
