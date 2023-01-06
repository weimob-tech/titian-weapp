const simulate = require('miniprogram-simulate');
const { getComponent } = require('../../common/test/getComponent');

describe('test component', () => {
  it('should render success', () => {
    const comp = getComponent('checkbox-group');
    comp.triggerLifeTime('attached');
    expect(comp).toMatchSnapshot();
  });

  it('should render options props success', async () => {
    const options = [
      { value: 'a', label: '选项 A' },
      { value: 'b', label: '选项 B' },
      {
        value: 'c',
        label: '选项 C'
      }
    ];
    const comp = getComponent('checkbox-group', {
      options,
      max: 1,
      name: 'test',
      value: ['a', 'c']
    });

    comp.triggerLifeTime('attached');
    await simulate.sleep(300);
    expect(comp).toMatchSnapshot();
  });
});
