/* eslint-disable no-unused-expressions */
// pages/cell/index.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    options: [
      {
        key: 'mode',
        type: 'radio',
        name: 'Mode',
        desc: '模式 ',
        list: [
          {
            label: '基础',
            value: 1,
            hiddenItems: ['partner', 'style'],
            attr: { title: '标题文字', longTitle: '标题文字' }
          },
          {
            label: '附加信息',
            value: 2,
            hiddenItems: ['partner', 'information', 'required'],
            attr: { title: '单行限制五' }
          },
          {
            label: '纯标题',
            value: 3,
            hiddenItems: ['style', 'information', 'required'],
            attr: {
              title: '标题文字',
              longTitle: '标题文字较长最大字数限制15个中文字符',
              titleWidth: '400rpx'
            }
          }
        ],
        value: 1
      },
      {
        key: 'partner',
        type: 'radio',
        name: 'Title',
        desc: '标题区 ',
        list: [
          { label: '搭图标', value: 1, attr: { icon: 'home' } },
          { label: '搭标签', value: 2, attr: { slotName: 'slot-icon' } }
        ],
        value: 1
      },
      {
        key: 'required',
        type: 'radio',
        name: 'Required',
        desc: '必填 ',
        list: [
          { label: '非必填', value: false },
          { label: '必填', value: true }
        ],
        value: false
      },
      {
        key: 'style',
        type: 'radio',
        name: 'Style',
        desc: '样式',
        list: [
          {
            label: '样式1',
            value: 1,
            attr: {
              label: '附加信息',
              desc: '首行对齐',
              alignItems: 'flex-start'
            }
          },
          {
            label: '样式2',
            value: 2,
            attr: { label: '附加信息', desc: '居中对齐', alignItems: 'center' }
          },
          {
            label: '样式3',
            value: 3,
            attr: {
              subDesc: '附加信息',
              desc: '首行对齐',
              alignItems: 'flex-start',
              extStyle: '--cell-label-text-color: #FA2C19'
            }
          }
        ],
        value: 1
      },
      {
        key: 'information',
        type: 'radio',
        name: 'Information',
        desc: '信息区',
        list: [
          { label: '无', value: 0 },
          { label: '图标', value: 1, hiddenItems: ['arrow'] },
          {
            label: '按钮',
            value: 2,
            hiddenItems: ['arrow'],
            attr: { slotName: 'slot-desc' }
          },
          {
            label: '单复选',
            value: 3,
            hiddenItems: ['arrow'],
            attr: { slotName: 'slot-desc' }
          },
          {
            label: '开关',
            value: 4,
            hiddenItems: ['arrow'],
            attr: { slotName: 'slot-desc' }
          },
          { label: '徽标', value: 5, attr: { slotName: 'slot-desc' } },
          { label: '图片', value: 6, attr: { slotName: 'slot-desc' } }
        ],
        value: 0
      },
      {
        key: 'arrow',
        type: 'radio',
        name: 'Arrow',
        desc: '箭头',
        list: [
          { label: '无', value: false },
          { label: '有', value: true }
        ],
        value: true
      }
    ],
    attr: null
  },

  onChange(event) {
    this.setData({ attr: event.detail });
  },

  onShareAppMessage() {
    return {
      title: 'Cell 单元格',
      path: 'pages/cell/index'
    };
  }
});
