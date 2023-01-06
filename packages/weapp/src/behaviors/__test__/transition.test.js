const path = require('path');
const simulate = require('miniprogram-simulate');

const { getBehavior } = require('../../common/test/getBehavior');
const { getComponent } = require('../../common/test/getComponent');

describe('test transition behavior', () => {
  jest.useFakeTimers();

  afterAll(() => {
    jest.useRealTimers();
  });

  it('should show transition success', async () => {
    const behavior = getBehavior(path.join(__dirname, '../transition'));
    const comp = getComponent(
      {
        template: '<view class="transition {{classes}}"></view>',
        behaviors: [behavior],
        externalClasses: [
          'enter-class',
          'enter-active-class',
          'enter-done-class',
          'exit-class',
          'exit-active-class',
          'exit-done-class'
        ]
      },
      {
        show: true
      }
    );
    const enterCallback = jest.fn();
    const enteringCallback = jest.fn();
    const enteredCallback = jest.fn();

    comp.addEventListener('enter', enterCallback);
    comp.addEventListener('entering', enteringCallback);
    comp.addEventListener('entered', enteredCallback);

    comp.triggerLifeTime('ready');

    expect(enterCallback).toBeCalled();

    jest.advanceTimersByTime(1000 / 30);
    expect(comp.data.classes).toBe('titian-fade-enter titian-fade-enter-active enter-class enter-active-class');
    expect(comp).toMatchSnapshot();
    expect(enteringCallback).toBeCalled();
    simulate.sleep(0).then(() => {
      jest.advanceTimersByTime(1000);
      expect(comp.data.classes).toBe(
        'titian-fade-enter-done titian-fade-enter-active enter-done-class enter-active-class'
      );
      expect(comp).toMatchSnapshot();
      expect(enteredCallback).toBeCalled();
    });
  });

  it('should hide transition success', () => {
    const behavior = getBehavior(path.join(__dirname, '../transition'));
    const comp = getComponent(
      {
        template: '<view class="transition {{classes}}"></view>',
        behaviors: [behavior],
        externalClasses: [
          'enter-class',
          'enter-active-class',
          'enter-done-class',
          'exit-class',
          'exit-active-class',
          'exit-done-class'
        ]
      },
      {
        show: true
      }
    );

    const exitCallback = jest.fn();
    const exitingCallback = jest.fn();
    const exitedCallback = jest.fn();

    comp.addEventListener('exit', exitCallback);
    comp.addEventListener('exiting', exitingCallback);
    comp.addEventListener('exited', exitedCallback);
    comp.triggerLifeTime('ready');

    jest.advanceTimersByTime(10000);

    comp.setData({
      show: false
    });
    expect(exitCallback).toBeCalled();

    jest.advanceTimersByTime(1000 / 30);
    expect(comp.data.classes).toBe('titian-fade-exit titian-fade-exit-active exit-class exit-active-class');
    expect(comp).toMatchSnapshot();
    expect(exitingCallback).toBeCalled();

    simulate.sleep(0).then(() => {
      jest.advanceTimersByTime(1000 / 30);
      expect(comp.data.classes).toBe('titian-fade-exit-done titian-fade-exit-active exit-done-class exit-active-class');
      expect(comp).toMatchSnapshot();

      jest.advanceTimersByTime(10000);
      expect(exitedCallback).toBeCalled();
      expect(comp.data.classes).toBe('');
      expect(comp).toMatchSnapshot();
    });
  });
});
