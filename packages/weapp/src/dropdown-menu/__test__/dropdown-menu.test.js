const simulate = require('miniprogram-simulate');
const { getComponent } = require('../../common/test/getComponent');

describe('test component', () => {
  jest.setTimeout(10000);
  it('should render success', (done) => {
    const comp = getComponent('dropdown-menu');
    const child = getComponent('dropdown-item', {
      title: 'title'
    });

    comp.triggerLifeTime('attached');
    child.triggerLifeTime('attached');

    const getParentRelationNodes = comp.instance.getRelationNodes;
    const getChildRelationNodes = child.instance.getRelationNodes;
    const parentAnimate = comp.instance.animate;

    comp.instance.animate = jest.fn();
    comp.instance.getRelationNodes = jest.fn(() => [child.instance]);
    child.instance.getRelationNodes = jest.fn(() => [comp.instance]);

    Promise.resolve()
      .then(() => {
        comp.instance.updateChildrenData();
        expect(
          comp.querySelector('.titian-dropdown-menu >>> .titian-button').dom.innerHTML.indexOf('title') > -1
        ).toBeTruthy();
        expect(comp).toMatchSnapshot();

        comp.querySelector('.titian-dropdown-menu >>> .titian-button').dispatchEvent('tap');
      })
      .then(async () => {
        await simulate.sleep(400);
        expect(child.data.visible).toBeTruthy();
        comp.querySelector('.titian-dropdown-menu >>> .titian-button').dispatchEvent('tap');
      })
      .then(async () => {
        await simulate.sleep(400);
        expect(child.data.visible).toBeFalsy();
      })
      .finally(() => {
        comp.instance.getRelationNodes = getParentRelationNodes;
        child.instance.getChildRelationNodes = getChildRelationNodes;
        comp.instance.animate = parentAnimate;
        child.triggerLifeTime('detached');
        done();
      });
  });

  it('should render props success', () => {
    const comp = getComponent('dropdown-menu', {
      icon: 'icon-test',
      mode: 'multiple',
      direction: 'up',
      activeColor: '#f00',
      hasMask: false,
      closeOnMask: true
    });
    const child = getComponent('dropdown-item');

    comp.triggerLifeTime('attached');
    child.triggerLifeTime('attached');

    const getParentRelationNodes = comp.instance.getRelationNodes;
    const getChildRelationNodes = child.instance.getRelationNodes;
    const parentAnimate = comp.instance.animate;

    comp.instance.animate = jest.fn();
    comp.instance.getRelationNodes = jest.fn(() => [child.instance]);
    child.instance.getRelationNodes = jest.fn(() => [comp.instance]);

    Promise.resolve()
      .then(() => {
        comp.instance.updateChildrenData();
      })
      .then(() => {
        expect(child.data.mode).toBe('multiple');
        expect(child.data.direction).toBe('up');
        expect(child.data.activeColor).toBe('#f00');
        expect(child.data.icon).toBe('icon-test');
        expect(child.data.hasMask).toBeFalsy();
        expect(child.data.closeOnMask).toBeTruthy();
      })
      .finally(() => {
        comp.instance.getRelationNodes = getParentRelationNodes;
        child.instance.getChildRelationNodes = getChildRelationNodes;
        comp.instance.animate = parentAnimate;
      });
  });
});
