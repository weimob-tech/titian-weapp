const { getComponent } = require('../../common/test/getComponent');

describe('test component', () => {
  it('should render success', () => {
    const comp = getComponent('row');
    expect(comp).toMatchSnapshot();
  });

  it('should gutter prop render success', () => {
    const comp = getComponent('row', {
      gutter: 8
    });

    const row = comp.querySelector('.titian-row-flex').dom;

    expect(row.style.marginLeft).toBe('-4px');
    expect(row.style.marginRight).toBe('-4px');

    expect(comp).toMatchSnapshot();
  });

  it('should flex prop render success', () => {
    const comp = getComponent('row', {
      flex: false
    });

    expect(comp).toMatchSnapshot();
  });
});
