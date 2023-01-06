const { getComponent } = require('../../common/test/getComponent');

describe('test component', () => {
  it('should render success', () => {
    const comp = getComponent('cell');
    expect(comp).toMatchSnapshot();
  });

  it('should render title width', () => {
    const comp = getComponent('cell', {
      titleWidth: '168rpx',
      title: '测试测试测试测试测试测试测试测试测试测试测试测试'
    });
    expect(comp).toMatchSnapshot();
  });

  it('should render success with title, label, desc, sub-desc', () => {
    const comp = getComponent('cell', {
      title: 'title',
      label: 'label',
      desc: 'desc',
      subDesc: 'sub-desc'
    });

    expect(comp).toMatchSnapshot();
  });

  it('should render success with title, icon', () => {
    const comp = getComponent('cell', {
      title: 'title',
      icon: 'checked'
    });
    expect(comp).toMatchSnapshot();
  });

  it('should render success with title, right icon', () => {
    const comp = getComponent('cell', {
      title: 'title',
      rightIcon: 'checked'
    });

    expect(comp).toMatchSnapshot();
  });

  it('should render success with required', () => {
    const comp = getComponent('cell', {
      title: 'title',
      required: true
    });
    expect(comp).toMatchSnapshot();
  });

  it('should render success without arrow', () => {
    const comp = getComponent('cell', {
      title: 'title',
      arrow: false
    });
    expect(comp).toMatchSnapshot();
  });

  it('should clickable disable', () => {
    const comp = getComponent('cell', {
      title: 'title',
      clickable: false
    });
    expect(comp).toMatchSnapshot();
  });

  it('should ext style add success', () => {
    const comp = getComponent('cell', {
      title: 'title',
      extStyle: 'background-color: red;'
    });
    expect(comp).toMatchSnapshot();
  });

  it('should tap success', (done) => {
    const comp = getComponent('cell', {
      title: 'title'
    });

    const callback = jest.fn();

    comp.addEventListener('click', callback);

    comp.querySelector('.titian-cell').dispatchEvent('tap');
    Promise.resolve().then(() => {
      expect(callback).toHaveBeenCalled();
      done();
    });
  });

  it('should tap not success when disable is true', (done) => {
    const comp = getComponent('cell', {
      title: 'title',
      disabled: true
    });

    const callback = jest.fn();

    comp.addEventListener('click', callback);

    comp.querySelector('.titian-cell').dispatchEvent('tap');
    Promise.resolve().then(() => {
      expect(callback).not.toHaveBeenCalled();
      done();
    });
  });
});
