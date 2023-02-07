const { getComponent } = require('../../common/test/getComponent');

describe('test component', () => {
  it('should render success', () => {
    const comp = getComponent('cell-group');
    expect(comp).toMatchSnapshot();
  });

  it('should render title、subTitle success', () => {
    const comp = getComponent('cell-group', {
      title: '标题',
      subTitle: '副标题'
    });
    expect(comp).toMatchSnapshot();
  });

  it('should render different mode success', () => {
    const comp = getComponent('cell-group', {
      mode: 'card'
    });

    expect(comp).toMatchSnapshot();
  });
});
