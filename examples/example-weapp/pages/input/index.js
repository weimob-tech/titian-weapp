// pages/input/index.js
Page({
  data: {
    value: '题发的',
    options: [
      {
        type: 'radio',
        name: 'Mode',
        key: 'mode',
        desc: '模式  ',
        list: [
          {
            value: 'default',
            label: '基础',
            hiddenItems: ['partner'],
            attr: {
              group: [
                {
                  type: 'text',
                  title: '标题文字',
                  placeholder: '请输入代文字文案'
                },
                {
                  type: 'digit',
                  title: '标题文字',
                  placeholder: '请输入代数字文案'
                },
                {
                  type: 'safe-password',
                  title: '标题文字',
                  placeholder: '请输入代密码文案'
                }
              ]
            }
          },
          {
            value: 'disabled',
            label: '只读禁用',
            hiddenItems: ['partner'],
            attr: {
              group: [
                { title: '标题文字', value: '只读文本样式', readonly: true },
                { title: '标题文字', value: '禁用文本样式', disabled: true }
              ]
            }
          },
          {
            value: 'overflow',
            label: '省略换行',
            hiddenItems: ['partner'],
            attr: {
              group: [
                {
                  title: '限制五个字字',
                  placeholder: '请输入代文字文案',
                  titleClass: 'ellipsis-line1'
                },
                {
                  title: '标题过于长支持换行',
                  placeholder: '请输入代文字文案'
                }
              ]
            }
          },
          {
            value: 'error',
            label: '错误提示',
            hiddenItems: ['partner'],
            attr: {
              group: [
                {
                  title: '账户名',
                  placeholder: '请输入代填项引导文案',
                  error: true
                },
                {
                  title: '身份证',
                  value: '12321312312312',
                  errorMessage: '身份证号格式错误'
                }
              ]
            }
          },
          {
            value: 'custom',
            label: '自定义',
            attr: {
              group: [
                { title: '标题文字', placeholder: '请输入代填项引导文案' },
                { title: '标题文字', placeholder: '请输入代填项引导文案' }
              ]
            }
          }
        ],
        value: 'default'
      },
      {
        type: 'radio',
        name: 'Title',
        key: 'required',
        desc: '标题区  ',
        list: [
          { value: false, label: '非必填' },
          { value: true, label: '必填 ' }
        ],
        value: true
      },
      {
        type: 'radio',
        name: 'Style',
        key: 'partner',
        desc: '样式  ',
        list: [
          {
            value: 'icon',
            label: '搭图标',
            attr: { templateNames: ['scan', 'question'] }
          },
          {
            value: 'button',
            label: '搭按钮',
            attr: {
              templateNames: ['qrcode', 'resend'],
              title: '验证码',
              placeholder: '请输入验证码'
            }
          },
          {
            value: 'image',
            label: '搭图片',
            attr: {
              templateNames: ['image1', 'image2'],
              placeholder: '请输入验证信息'
            }
          },
          {
            value: 'dropdown',
            label: '下拉选项',
            attr: { templateNames: ['tel', 'city'] }
          },
          {
            value: 'title',
            label: '标题图标',
            attr: { title: '文案', prefixIcon: ['camera-point', 'connect'] }
          }
        ],
        value: 'icon'
      },
      {
        type: 'radio',
        name: 'Align',
        key: 'textAlign',
        desc: '对齐 ',
        list: [
          { value: 'left', label: '左对齐' },
          { value: 'right', label: '右对齐 ' }
        ],
        value: 'left'
      }
    ],
    attrs: {}
  },
  onChange(e) {
    this.setData({ attrs: e.detail });
  },
  onShareAppMessage() {
    return {
      title: 'Input 输入框',
      path: 'pages/input/index'
    };
  }
});
