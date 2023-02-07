const comm = {
  props: {
    value: [1],
    options: [
      {
        title: '标题文字A',
        content: '- 标题A下的内容 -'
      },
      {
        title: '标题文字B',
        content: '- 标题B下的内容 -'
      }
    ]
  },
  params: {},
  open: [0],
  close: [0, 1],
  expect: ['标题文字B', [1, 0], [1], []]
};
const data = [
  { ...comm, label: '常规场景1' },
  {
    ...comm,
    label: '常规场景2 互斥',
    open: [0, 1],
    close: [0],
    props: { ...comm.props, repel: true },
    expect: ['标题文字B', 0, '', 1]
  }
];

module.exports.data = data;
