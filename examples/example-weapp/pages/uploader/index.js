let flag = false;
Page({
  data: {
    beforeUpload(params, file) {
      return {
        cloudPath: file.name,
        filePath: file.path
      };
    },
    upload(uploader, fileKey) {
      wx.cloud.init();
      const file = uploader.fileMap[fileKey];
      const params = uploader.setUploadParams(file);
      const uploadTask = wx.cloud.uploadFile({
        ...params,
        success: uploader.uploadSuccess.bind(uploader, fileKey),
        fail: uploader.uploadFail.bind(uploader, fileKey),
        complete: uploader.uploadComplete.bind(uploader, fileKey)
      });
      uploader.uploadPurogressUpdate(fileKey, uploadTask);
    },
    afterUpload(res) {
      if (flag || res.errMsg !== 'cloud.uploadFile:ok') {
        return {
          status: 'fail'
        };
      }
      return {
        path: res.fileID,
        status: 'done'
      };
    },
    complete(file, fileList) {
      const list = fileList.map(({ tip, style, ...other }) => other);
      const index = list.findIndex((item) => item.status === 'done' && item.fileType === 'image');
      if (index === -1) {
        return list;
      }
      return list.map((item, idx) =>
        idx === index
          ? {
              ...item,
              tip: '封面',
              style:
                'position:absolute;color:#fff;background:rgba(0,0,0);bottom:0;right:0;transform:translate(-5px, -5px);font-size:18rpx;width:60rpx;height:32rpx;line-height:32rpx;text-align:center;border-radius:8rpx;'
            }
          : item
      );
    },
    options: [
      {
        type: 'radio',
        name: 'Word',
        key: 'word',
        value: false,
        desc: '文字',
        list: [
          { value: false, label: '无', attr: { uploadText: '' } },
          { value: true, label: '有', attr: { uploadText: '上传图片' } }
        ]
      },
      {
        type: 'radio',
        name: 'Size',
        key: 'size',
        value: 'small',
        desc: '规格',
        list: [
          { value: 'small', label: 'Medium' },
          { value: 'large', label: 'Big' }
        ]
      },
      {
        type: 'radio',
        name: 'State',
        key: 'state',
        value: 'success',
        desc: '状态',
        list: [
          { value: 'success', label: '成功' },
          { value: 'loading', label: '加载' },
          { value: 'error', label: '失败' }
        ]
      },
      {
        type: 'radio',
        name: 'Limit',
        key: 'count',
        value: 999,
        desc: '限制',
        list: [
          { value: 999, label: '无' },
          { value: 3, label: '限3张图' }
        ]
      }
    ],
    fileList: [
      {
        path: 'https://www.pourzad.com/Programming/Learn%20Java%20for%20Web%20Development.pdf',
        name: 'Learn Java for Web Development.pdf',
        fileType: 'file',
        poster: '',
        status: 'done'
      },
      {
        path: 'http://v0.cdn.cgmama.com/2021/08/1833615c74f86c0bda6b765b28ce2010.mov',
        name: 'Close Up Shot Rain Drops Falling On Leaves',
        fileType: 'video',
        poster: '',
        status: 'done'
      },
      {
        path: '//hbimg.huabanimg.com/5d7b8cae2077b5bb04b318dbd9edb19921980c37c7482-B1eXch_fw658/format/webp',
        name: '',
        fileType: 'image',
        poster: '',

        status: 'done'
      },
      {
        path: '',
        name: '',
        fileType: 'image',
        poster: '',
        status: 'fail'
      }
    ]
  },
  onChange(event) {
    const { detail } = event;
    if (detail.state === 'error') {
      flag = true;
    } else {
      flag = false;
    }
    this.setData({
      attrs: { url: 'http://172.18.73.33:3000/upload', ...detail }
    });
  },
  onShareAppMessage() {
    return {
      title: 'Uploader 上传',
      path: 'pages/uploader/index'
    };
  }
});
