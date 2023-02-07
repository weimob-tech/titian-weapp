const { getComponent } = require('../../common/test/getComponent');

describe('test component', () => {
  it('should render success', () => {
    const comp = getComponent('button', {
      variant: 'filled'
    });
    comp.triggerLifeTime('attached');
    expect(comp).toMatchSnapshot();
  });

  it('should render success with color', () => {
    const comp = getComponent('button', {
      color: 'linear-gradient(270deg, rgba(239, 71, 31, 0.75) 0%, #FFBE70 100%)'
    });
    expect(comp).toMatchSnapshot();
  });

  it('should render success with color', () => {
    const comp = getComponent('button', {
      color: '#f60'
    });
    expect(comp).toMatchSnapshot();
  });
  it('should render success with variant', () => {
    const comp = getComponent('button', {
      variant: 'filled'
    });
    expect(comp).toMatchSnapshot();
  });

  it('should render success with variant', () => {
    const comp = getComponent('button', {
      variant: 'outlined'
    });
    expect(comp).toMatchSnapshot();
  });
});
