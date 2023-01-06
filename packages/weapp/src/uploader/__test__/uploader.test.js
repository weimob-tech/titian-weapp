const simulate = require('miniprogram-simulate');
const { getComponent } = require('../../common/test/getComponent');
const {
  data,
  value,
  chooseMediaImage,
  changeCallbackJpgFile,
  customChooseMediaImage,
  customJpgUploadSuccess,
  customTxtFileUploadSuccess,
  customChooseMessageFileTxt,
  customChangeCallbackJpgFileListItem,
  customChangeCallbackTxtFileListItem
} = require('./mock/index');

describe('test component', () => {
  it('should render success', () => {
    const comp = getComponent('uploader');
    expect(comp).toMatchSnapshot();
  });
  it('uploader 受控', (done) => {
    const comp = getComponent('uploader', {
      value
    });
    const chooseImg = comp.querySelector('.titian-uploader-action');
    const chooseMedia = jest.fn(() => Promise.resolve(customChooseMediaImage));

    global.wx.chooseMedia = chooseMedia;

    const changeCallback = jest.fn((mock) => {
      const list = mock.detail.fileList.map((item) => {
        if (item.status === 'chose') {
          return {
            ...item,
            status: 'done'
          };
        }
        return { ...item };
      });
      comp.setData(
        {
          value: list
        },
        () => {
          const imageList = comp.querySelectorAll('.titian-uploader-image');
          expect(imageList.length).toEqual(2);
          done();
        }
      );
    });

    comp.addEventListener('change', changeCallback);

    chooseImg.dispatchEvent('tap');
  });

  it('uploader 自定义上传', (done) => {
    // let
    const array = [customJpgUploadSuccess, customTxtFileUploadSuccess];
    let number = 0;
    const beforeChoose = jest.fn((list) => {
      if (list.length >= 1) {
        return {
          chooseType: 'chooseMessageFile',
          messageFileType: 'all',
          extension: []
        };
      }
      return {};
    });
    const afterChoose = jest.fn((selectList, fileList) => {
      if (fileList.length > 2) {
        return selectList;
      }
      return selectList.filter((item) => item.path.indexOf('.png') === -1);
    });
    const upload = jest.fn((uploader, fileKey) => {
      const file = uploader.fileMap[fileKey];
      const params = uploader.setUploadParams(file);
      const uploadTask = wx.uploadFile({
        ...params,
        filePath: file.path,
        success: uploader.uploadSuccess.bind(uploader, fileKey),
        fail: uploader.uploadFail.bind(uploader, fileKey),
        complete: uploader.uploadComplete.bind(uploader, fileKey)
      });
      uploader.uploadPurogressUpdate(fileKey, uploadTask);
    });
    const beforeUpload = jest.fn((params, file) => {
      if (file.fileType === 'image') {
        params.url += 'Image';
      } else if (file.fileType === 'video') {
        params.url += 'Video';
      }
      return params;
    });

    const afterUpload = jest.fn((res, file) => {
      if (res.statusCode === 200) {
        try {
          const response = JSON.parse(res.data);
          if (response.code === 200) {
            return {
              path:
                // eslint-disable-next-line no-nested-ternary
                file.fileType === 'image'
                  ? response.data.pathImage
                  : file.fileType === 'video'
                  ? response.data.pathVideo
                  : response.data.path,
              status: 'done'
            };
          }
          return {
            status: 'fail'
          };
        } catch (e) {
          return {
            status: 'fail'
          };
        }
      }
      return {
        status: 'fail'
      };
    });
    const comp = getComponent('uploader', {
      beforeChoose,
      afterChoose,
      beforeUpload,
      upload,
      afterUpload,
      url: 'http://127.0.0.1'
    });
    const chooseImg = comp.querySelector('.titian-uploader-action');

    const changeCallback = jest.fn((mock) => {
      if (mock.detail.fileList.length === 1 && mock.detail.fileList.every((item) => item.status === 'done')) {
        number += 1;
        const chooseImg1 = comp.querySelector('.titian-uploader-action');
        chooseImg1.dispatchEvent('tap');
        // eslint-disable-next-line no-dupe-else-if
      } else if (mock.detail.fileList.length === 2 && mock.detail.fileList.every((item) => item.status === 'done')) {
        expect([customChangeCallbackJpgFileListItem, customChangeCallbackTxtFileListItem]).toStrictEqual(
          mock.detail.fileList
        );
        done();
      }
    });

    comp.addEventListener('change', changeCallback);

    global.wx.uploadFile = jest.fn(({ success, complete }) => {
      setTimeout(() => {
        success(array[number]);
        complete();
      });
      return {
        onProgressUpdate: (fn) => {
          fn({ progress: 100 });
        }
      };
    });
    const chooseMedia = jest.fn(() => Promise.resolve(customChooseMediaImage));
    const chooseMessageFile = jest.fn(() => Promise.resolve(customChooseMessageFileTxt));
    global.wx.chooseMessageFile = chooseMessageFile;
    global.wx.chooseMedia = chooseMedia;

    chooseImg.dispatchEvent('tap');
  });

  it('uploader 点击删除 取消上传', async () => {
    const comp = getComponent('uploader', { url: 'http://127.0.0.1' });
    const chooseImg = comp.querySelector('.titian-uploader-action');
    const changeCallback = jest.fn();
    const abort = jest.fn();

    comp.addEventListener('change', changeCallback);
    const chooseMedia = jest.fn(() => Promise.resolve(chooseMediaImage));
    global.wx.chooseMedia = chooseMedia;
    global.wx.uploadFile = jest.fn(() => ({
      onProgressUpdate: (fn) => {
        fn({ progress: 100 });
      },
      abort
    }));

    chooseImg.dispatchEvent('tap');
    await simulate.sleep(0);
    const delImg = comp.querySelector('.titian-uploader-del');
    changeCallback.mockClear();
    delImg.dispatchEvent('tap');
    await simulate.sleep(0);
    expect(abort).toHaveBeenCalledTimes(1);
    expect(changeCallback.mock.calls[0][0].detail).toStrictEqual({
      file: {
        ...changeCallbackJpgFile,
        path: chooseMediaImage.tempFiles[0].tempFilePath,
        status: 'cacal'
      },
      uploading: false,
      fileList: []
    });
  });

  it('uploader 离开当前页面 中断上传', async () => {
    const comp = getComponent('uploader', { url: 'http://127.0.0.1' });
    const chooseImg = comp.querySelector('.titian-uploader-action');
    const changeCallback = jest.fn();
    const abort = jest.fn();

    comp.addEventListener('change', changeCallback);
    const chooseMedia = jest.fn(() => Promise.resolve(chooseMediaImage));
    global.wx.chooseMedia = chooseMedia;
    global.wx.uploadFile = jest.fn(() => ({
      onProgressUpdate: (fn) => {
        fn({ progress: 100 });
      },
      abort
    }));
    chooseImg.dispatchEvent('tap');
    await simulate.sleep(0);
    changeCallback.mockClear();
    comp.triggerLifeTime('detached');
    await simulate.sleep(0);
    expect(abort).toHaveBeenCalledTimes(1);
  });
});

describe.each(data)('test component success $label', ({ list }) => {
  test.each(list)(` $label `, (item, done) => {
    const comp = getComponent('uploader', item.props);
    comp.triggerLifeTime('ready');
    let chooseError = false;
    const onDelete = jest.fn(comp.instance.onDelete);
    const submitFn = jest.fn(comp.instance.submit);
    comp.instance.onDelete = onDelete;
    comp.instance.submit = submitFn;
    const changeCallback = jest.fn();
    const deleteCallback = jest.fn((d) => {
      changeCallback.mockClear();
      const delImage = comp.querySelector('.titian-uploader-del') || comp.querySelector('.titian-uploader-fail');
      if (delImage) {
        delImage.dispatchEvent('tap');
        setTimeout(() => {
          if (typeof item.props.disabled === 'boolean' && item.props.disabled) {
            expect(onDelete).toHaveBeenCalledTimes(1);
          } else {
            expect(changeCallback.mock.calls[0][0].detail).toStrictEqual(item.changeCallback[1]);
          }
          d();
        });
      } else {
        d();
      }
    });

    const errorCallback = jest.fn((d, mock) => {
      chooseError = true;
      expect(mock.detail).toStrictEqual(item.errorMessage);
      d();
    });
    comp.addEventListener('change', changeCallback);
    comp.addEventListener('error', errorCallback.bind(this, done));
    const choose = jest.fn(() => Promise.resolve(item.choose));
    global.wx.chooseMedia = choose;
    global.wx.chooseImage = choose;
    global.wx.chooseVideo = choose;
    global.wx.chooseMessageFile = choose;
    const chooseImg = comp.querySelector('.titian-uploader-action');

    global.wx.uploadFile = jest.fn(({ success, fail, complete }) => {
      changeCallback.mockClear();
      setTimeout(() => {
        if (!chooseError) {
          if (item.uploadError) {
            fail();
          } else {
            success(item.upload);
          }
          complete();
          setTimeout(() => {
            expect(changeCallback.mock.calls[0][0].detail).toStrictEqual(item.changeCallback[0]);
            if (item.uploadError) {
              deleteCallback(done);
              return;
            }
            const preview = comp.querySelector('.titian-uploader-preview');
            if (preview && preview.dispatchEvent) {
              preview.dispatchEvent('tap');
            } else {
              deleteCallback(done);
            }
          }, 0);
        }
      }, 0);

      return {
        onProgressUpdate: (fn) => {
          fn({ progress: 100 });
        },
        abort: jest.fn()
      };
    });
    const previewFn = jest.fn((params) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { fail, ...other } = params;
      expect(other).toStrictEqual(item.preview);
      deleteCallback(done);
    });
    global.wx.previewMedia = previewFn;
    global.wx.previewImage = previewFn;

    if (typeof item.props.disabled === 'boolean' && item.props.disabled) {
      if (item.uploadError) {
        deleteCallback(done);
        return;
      }
      if (item.submit) {
        comp.instance.submit();
        expect(submitFn).toHaveBeenCalledTimes(1);
      }
      const preview = comp.querySelector('.titian-uploader-preview');
      if (preview && preview.dispatchEvent) {
        preview.dispatchEvent('tap');
      } else {
        deleteCallback(done);
      }
      return;
    }

    chooseImg.dispatchEvent('tap');
    if (item.submit) {
      setTimeout(() => {
        comp.instance.submit();
        if (typeof comp.data.immediately === 'boolean' && comp.data.immediately) {
          expect(submitFn).toHaveBeenCalledTimes(1);
        }
      });
    }
  });
});
