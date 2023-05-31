// eslint-disable-next-line import/extensions
import { $tiToast } from '../../dist/index';
import { mergeOptionIntoAttrs } from '../../util/index.js';

Page({
  data: {
    options: [
      {
        desc: '模式',
        key: 'state',
        type: 'radio',
        name: 'Mode',
        list: [
          { label: '文字', value: 1, hiddenItems: ['iconWord'], attr: {} },
          { label: '图文', value: 2, hiddenItems: ['word'], attr: {} }
        ],
        value: 1
      },
      {
        desc: '文字',
        key: 'word',
        type: 'radio',
        name: 'Word',
        list: [
          {
            label: '单行',
            value: 1,
            attr: { action: 'info', text: '只有一行' },
            hiddenItems: ['style']
          },
          {
            label: '多行',
            value: 2,
            attr: { action: 'info', text: '我有很多行我有很多行我有很多行' },
            hiddenItems: ['style']
          }
        ],
        value: 1
      },
      {
        desc: '文字',
        key: 'iconWord',
        type: 'radio',
        name: 'Word',
        list: [
          {
            label: '加载',
            value: 1,
            hiddenItems: ['style'],
            attr: { text: '加载中', action: 'loading' }
          },
          {
            label: '成功',
            value: 2,
            hiddenItems: ['style'],
            attr: { text: '成功信息', action: 'success' }
          },
          {
            label: '失败',
            value: 3,
            hiddenItems: ['style'],
            attr: { text: '失败信息', action: 'fail' }
          },
          {
            label: '提示',
            value: 4,
            hiddenItems: ['style'],
            attr: { text: '提示信息', action: 'warn', iconName: 'question' }
          }
        ],
        value: 1
      },
      {
        desc: '样式',
        key: 'style',
        type: 'radio',
        name: 'Style',
        list: [
          { label: '图标1', value: 1, attr: { iconName: 'clock-alarm' } },
          {
            label: '图标2',
            value: 2,
            attr: { iconName: 'rate-star-highlight' }
          },
          { label: '图标3', value: 3, attr: { iconName: 'go-to-top' } }
        ],
        value: 1
      },
      {
        desc: '回调',
        key: 'finishedCallback',
        type: 'radio',
        name: 'Callback',
        list: [
          {
            label: '回调1',
            value: 1,
            property: {
              finishedCallback: () => {
                console.log('执行了 Callback 1!');
              }
            }
          },
          {
            label: '回调2',
            value: 2,
            property: {
              finishedCallback: () => {
                console.log('执行了 Callback 2!');
              }
            }
          }
        ],
        value: 1
      }
      // {
      //   desc: '位置',
      //   key: 'position',
      //   type: 'radio',
      //   name: 'Position',
      //   list: [
      //     { label: '默认', value: 1, attr: {} },
      //     { label: '顶部', value: 2, attr: {} },
      //     { label: '底部', value: 3, attr: {} }
      //   ],
      //   value: 1
      // },
      // {
      //   desc: '堆叠',
      //   key: 'pile',
      //   type: 'radio',
      //   name: 'Pile',
      //   list: [
      //     { label: '否', value: false, attr: {} },
      //     { label: '是', value: true, attr: {} }
      //   ],
      //   value: false
      // }
    ]
  },
  onChange(event) {
    const { options } = this.data;
    const attr = event.detail;
    const afterAttr = mergeOptionIntoAttrs(options, attr);
    // options.forEach((opt) => {
    //   const attrVal = attr[opt.key];
    //   if (Array.isArray(opt.list)) {
    //     opt.list.forEach((o) => {
    //       if (o.value === attrVal) {
    //         if (o.attr) {
    //           Object.assign(afterAttr, o.attr);
    //         } else {
    //           afterAttr[opt.key] = o.value;
    //         }
    //       }
    //     });
    //   } else {
    //     afterAttr[opt.key] = attr[opt.key];
    //   }
    // });
    console.log('afterAttr', afterAttr);
    const { action, ...other } = afterAttr;
    $tiToast[action](other);
  },
  onShareAppMessage() {
    return {
      title: 'Toast 轻提示',
      path: 'pages/toast/index'
    };
  }
});
