const { iconList } = require('./icon');

module.exports = {
  name: 'icon',
  example: [
    {
      icon_id: '21948963',
      name: '全局-扫码',
      font_class: 'scan',
      unicode: 'e613',
      unicode_decimal: 58899
    },
    {
      icon_id: '21948964',
      name: '上拉菜单-关闭',
      font_class: 'close',
      unicode: 'e614',
      unicode_decimal: 58900
    },
    {
      icon_id: '21948965',
      name: '全局-删除',
      font_class: 'delete',
      unicode: 'e615',
      unicode_decimal: 58901
    },
    {
      icon_id: '21948966',
      name: 'Navbar-返回（特殊）',
      font_class: 'nav-back',
      unicode: 'e616',
      unicode_decimal: 58902
    }
  ],
  double: [
    {
      icon_id: '25139386',
      name: '清除-双色图标',
      font_class: 'close-double',
      unicode: '',
      unicode_decimal: 59052
    }
  ],
  basic: iconList,
  linear: [],
  surface: []
};
