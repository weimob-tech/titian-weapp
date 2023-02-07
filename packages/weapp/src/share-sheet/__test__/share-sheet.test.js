const { getComponent } = require('../../common/test/getComponent');

describe('test component', () => {
  it('单行', async () => {
    const getuserinfo = jest.fn();
    const contact = jest.fn();
    const getphonenumber = jest.fn();
    const error = jest.fn();
    const launchapp = jest.fn();
    const opensetting = jest.fn();
    const select = jest.fn();
    const cancel = jest.fn();
    const close = jest.fn();

    const comp = getComponent('share-sheet', {
      visible: true,
      options: [
        {
          name: '微信',
          icon: 'share-wechat',
          openType: 'share',
          color: '#f5f5f5',
          bgc: '#26c85a'
        },
        { name: '朋友圈', icon: 'link', openType: 'getUserInfo' },
        { name: 'QQ', icon: 'picture' },
        { name: '微博', icon: 'goods' }
      ]
    });
    comp.addEventListener('select', select);
    comp.addEventListener('getuserinfo', getuserinfo);
    comp.addEventListener('contact', contact);
    comp.addEventListener('getphonenumber', getphonenumber);
    comp.addEventListener('error', error);
    comp.addEventListener('launchapp', launchapp);
    comp.addEventListener('opensetting', opensetting);
    comp.addEventListener('cancel', cancel);
    comp.addEventListener('close', close);

    const shareSheet = comp.instance;
    expect(comp.querySelectorAll('.titian-share-sheet-row').length).toBe(1);

    const [shareComp, getUserInfoComp, QQComp, weiboComp] = comp.querySelectorAll('.titian-share-sheet-col');

    shareComp.dispatchEvent('tap');
    await Promise.resolve();
    expect(select).toHaveBeenCalledTimes(0);

    select.mockClear();

    getUserInfoComp.dispatchEvent('tap');
    await Promise.resolve();
    expect(select).toHaveBeenCalledTimes(0);
    select.mockClear();

    QQComp.dispatchEvent('tap');
    await Promise.resolve();
    expect(select).toHaveBeenCalledTimes(1);
    expect(select.mock.calls[0][0].detail).toStrictEqual({
      select: { name: 'QQ', icon: 'picture' }
    });

    select.mockClear();

    weiboComp.dispatchEvent('tap');
    await Promise.resolve();
    expect(select).toHaveBeenCalledTimes(1);
    expect(select.mock.calls[0][0].detail).toStrictEqual({
      select: { name: '微博', icon: 'goods' }
    });

    select.mockClear();

    shareSheet.onGetUserInfo({ detail: {} });
    expect(getuserinfo).toHaveBeenCalledTimes(1);
    expect(getuserinfo.mock.calls[0][0].detail).toStrictEqual({});
    getuserinfo.mockClear();

    shareSheet.onContact({ detail: {} });
    expect(contact).toHaveBeenCalledTimes(1);
    expect(contact.mock.calls[0][0].detail).toStrictEqual({});
    contact.mockClear();

    shareSheet.onGetPhoneNumber({ detail: {} });
    expect(getphonenumber).toHaveBeenCalledTimes(1);
    expect(getphonenumber.mock.calls[0][0].detail).toStrictEqual({});
    getphonenumber.mockClear();

    shareSheet.onError({ detail: {} });
    expect(error).toHaveBeenCalledTimes(1);
    expect(error.mock.calls[0][0].detail).toStrictEqual({});
    error.mockClear();

    shareSheet.onLaunchApp({ detail: {} });
    expect(launchapp).toHaveBeenCalledTimes(1);
    expect(launchapp.mock.calls[0][0].detail).toStrictEqual({});
    launchapp.mockClear();

    shareSheet.onOpenSetting({ detail: {} });
    expect(opensetting).toHaveBeenCalledTimes(1);
    expect(opensetting.mock.calls[0][0].detail).toStrictEqual({});
    opensetting.mockClear();

    cancel.mockClear();
    close.mockClear();

    comp.querySelector('.titian-share-sheet-cancel').dispatchEvent('tap');
    await Promise.resolve();
    expect(cancel).toHaveBeenCalledTimes(1);
    expect(cancel.mock.calls[0][0].detail).toStrictEqual({});

    shareSheet.onClose({ detail: {} });
    expect(close).toHaveBeenCalledTimes(1);
    expect(close.mock.calls[0][0].detail).toStrictEqual({});

    expect(comp).toMatchSnapshot();
  });

  it('多行', async () => {
    const select = jest.fn();
    const comp = getComponent('share-sheet', {
      visible: true,
      options: [
        [
          {
            name: '微信',
            icon: 'share-wechat',
            openType: 'share',
            color: '#f5f5f5',
            bgc: '#26c85a'
          },
          { name: '朋友圈', icon: 'link', openType: 'getUserInfo' }
        ],
        [
          { name: 'QQ', icon: 'picture' },
          { name: '微博', icon: 'goods' }
        ]
      ]
    });
    comp.addEventListener('select', select);

    expect(comp.querySelectorAll('.titian-share-sheet-row').length).toBe(2);

    const [shareComp, getUserInfoComp, QQComp, weiboComp] = comp.querySelectorAll('.titian-share-sheet-col');

    shareComp.dispatchEvent('tap');
    await Promise.resolve();
    expect(select).toHaveBeenCalledTimes(0);

    select.mockClear();

    getUserInfoComp.dispatchEvent('tap');
    await Promise.resolve();
    expect(select).toHaveBeenCalledTimes(0);
    select.mockClear();

    QQComp.dispatchEvent('tap');
    await Promise.resolve();
    expect(select).toHaveBeenCalledTimes(1);
    expect(select.mock.calls[0][0].detail).toStrictEqual({
      select: { name: 'QQ', icon: 'picture' }
    });

    select.mockClear();

    weiboComp.dispatchEvent('tap');
    await Promise.resolve();
    expect(select).toHaveBeenCalledTimes(1);
    expect(select.mock.calls[0][0].detail).toStrictEqual({
      select: { name: '微博', icon: 'goods' }
    });

    select.mockClear();

    expect(comp).toMatchSnapshot();
  });
});
