const { getComponent } = require('../../common/test/getComponent');

describe('test component', () => {
  it('should render success', () => {
    const comp = getComponent('badge');
    comp.triggerLifeTime('attached');
    expect(comp).toMatchSnapshot();
  });

  it('should render success with content', () => {
    const comp = getComponent('badge', {
      content: '1'
    });
    expect(comp).toMatchSnapshot();
  });

  it('should render success with icon', () => {
    const comp = getComponent('badge', {
      icon: 'home'
    });
    expect(comp).toMatchSnapshot();
  });
  it('should render success with dot', () => {
    const comp = getComponent('badge', {
      dot: true
    });
    expect(comp).toMatchSnapshot();
  });
});
