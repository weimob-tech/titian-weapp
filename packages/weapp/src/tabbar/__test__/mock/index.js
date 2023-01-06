const tabbarIndex = {
  label: '常规-下标',
  props: {
    value: 1,
    options: [
      { icon: 'home', title: '首页' },
      { icon: 'arrange', title: '分类' },
      { icon: 'cart', title: '购物车' },
      { icon: 'user-account-setting', title: '我的' }
    ]
  },
  params: {},
  expect: ['分类', 0]
};
const tabbarValue = {
  label: '常规-值',
  props: {
    value: 'third',
    options: [
      { icon: 'home', title: '首页', value: 'first' },
      { icon: 'arrange', title: '分类', value: 'second' },
      { icon: 'cart', title: '购物车', value: 'third' },
      { icon: 'user-account-setting', title: '我的', value: 'fourth' }
    ]
  },
  params: {},
  expect: ['购物车', 'first']
};
const data = [tabbarIndex, tabbarValue];
module.exports.data = data;
