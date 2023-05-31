/* eslint-disable import/extensions */
// eslint-disable-next-line import/extensions
import { $tiDialog } from '../../dist/index';
import { mergeOptionIntoAttrs } from '../../util/index.js';

Page({
  data: {
    visible: false,
    options: [
      {
        desc: '内容',
        key: 'content',
        type: 'radio',
        name: 'Content',
        list: [
          { label: '单行', value: 1, property: { content: '弹窗正文单行' } },
          {
            label: '多行',
            value: 2,
            property: {
              title: '弹框标题弹框标题弹框标题弹框标题弹框标题弹框标题',
              content:
                '使用\\n手动换行，限制宽度超出后自动折行。\n文字填充内容文字填充内容文字填充内容文字填充内容文字填充内容文字填充内容文字填充内容文字填充内容文字填充内容文字填充内容文字填充内容文字填充内容文字填充内容文字填充内容文字填充内容文字填充内容文字填充内容文字填充内容文字填充内容文字填充内容文字填充内容文字填充内容文字填充内容文字填充内容文字填充内容文字填充内容文字填充内容文字填充内容文字填充内容文字填充内容文字填充内容文字填充内容文字填充内容'
            }
          },
          { label: '自定义插槽', value: 3, attr: { useContentSlot: true } }
        ],
        value: 1
      },
      {
        desc: '标题',
        key: 'title',
        type: 'radio',
        name: 'Title',
        list: [
          { label: '无', value: 1, property: { title: '' } },
          { label: '有', value: 2, property: { title: '弹框标题' } }
        ],
        value: 1
      },
      {
        desc: '按钮类型',
        key: 'isTextButton',
        type: 'radio',
        name: 'IsTextButton',
        list: [
          { label: '实心', value: 1, property: { isTextButton: false } },
          { label: '文字', value: 2, property: { isTextButton: true } }
        ],
        value: 1
      },
      {
        desc: '取消按钮',
        key: 'num',
        type: 'radio',
        name: 'Number',
        list: [
          {
            label: '无',
            value: false,
            property: { hasCancelButton: false, isTextButton: true }
          },
          { label: '有', value: true, property: { hasCancelButton: true } }
        ],
        value: true
      }
    ],
    attr: {}
  },
  onChange(event) {
    const { options } = this.data;
    const attr = event.detail;
    const afterAttr = mergeOptionIntoAttrs(options, attr);

    afterAttr.useContentSlot = !!afterAttr.useContentSlot;
    Object.assign(afterAttr, {
      onCancel: () => {
        console.log('dialog onCancel!');
      },
      onConfirm: () => {
        console.log('dialog onConfirm!');
      },
      onClose: () => {
        console.log('dialog onClose!');
      }
    });
    this.setData({
      attr: afterAttr
    });
  },
  onConfirm1() {
    console.log('声明式调用 - dialog onConfirm1!');
    this.setData({
      visible: false
    });
  },
  onCancel1() {
    console.log('声明式调用 - dialog onCancel1!');
    this.setData({
      visible: false
    });
  },
  onClose1() {
    console.log('声明式调用 - dialog onClose1!');
    this.setData({
      visible: false
    });
  },
  onClickForAPI() {
    $tiDialog().show(this.data.attr);
  },
  onClickForDom() {
    this.setData({
      visible: true
    });
  },
  onShareAppMessage() {
    return {
      title: 'Dialog 对话框',
      path: 'pages/dialog/index'
    };
  }
});
