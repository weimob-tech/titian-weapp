const { getComponent } = require('../../common/test/getComponent');

describe('test component', () => {
  it('should render success', () => {
    const comp = getComponent('progress', {
      color: '#ff0000',
      gradientColor: {
        from: '#ffff00',
        to: '#ff0000'
      }
    });
    comp.triggerLifeTime('attached');
    expect(comp).toMatchSnapshot();
  });

  it('should render value success', () => {
    const comp = getComponent('progress', {
      color: '#ff0000',
      value: 50
    });
    comp.triggerLifeTime('attached');
    expect(comp).toMatchSnapshot();
  });
});
