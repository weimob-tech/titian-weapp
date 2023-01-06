const { getComponent } = require('../../common/test/getComponent');

describe('test component', () => {
  it('should render success', () => {
    const comp = getComponent('action-sheet');
    expect(comp).toMatchSnapshot();
  });
});
