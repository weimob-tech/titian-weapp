const movUploadSuccess = {
  statusCode: 200,
  data: '{"message":"","code":200,"data":{"path":"http://localhost:3000/fw8d7iehm94.mov"}}',
  errMsg: 'uploadFile:ok'
};
const jpgUploadSuccess = {
  statusCode: 200,
  data: '{"message":"","code":200,"data":{"path":"http://127.0.0.1:3000/o61e7hi7lg.jpg"}}',
  errMsg: 'uploadFile:ok'
};
const chooseMediaImage = {
  errMsg: 'chooseMedia:ok',
  type: 'image',
  tempFiles: [
    {
      tempFilePath: 'http://tmp/60x7XxAmaPjzdf3c68a39bcb172c1b03077fc336cca6.jpg',
      size: 18878,
      fileType: 'image'
    }
  ]
};
const chooseVideoMovTempFile = {
  tempFilePath: 'http://tmp/96NgI6RvT4el6c7340bed691689395e8b6884c366176.mov',
  size: 1024 * 1024 * 10,
  fileType: 'video',
  duration: 30.571,
  width: 480,
  height: 270,
  thumbTempFilePath: 'http://tmp/phUChtXGwM3A7fa008fd65cdb63c342aa830c6ffce82.jpg'
};

const previewMov = {
  url: 'http://localhost:3000/fw8d7iehm94.mov',
  poster: 'http://tmp/phUChtXGwM3A7fa008fd65cdb63c342aa830c6ffce82.jpg',
  type: 'video'
};
const previewJpg = {
  urls: ['http://127.0.0.1:3000/o61e7hi7lg.jpg'],
  current: 'http://127.0.0.1:3000/o61e7hi7lg.jpg'
};

const changeCallbackJpgFile = {
  path: 'http://127.0.0.1:3000/o61e7hi7lg.jpg',
  poster: '',
  size: 18878,
  name: '60x7XxAmaPjzdf3c68a39bcb172c1b03077fc336cca6.jpg',
  duration: 0,
  fileType: 'image',
  status: 'done'
};

const changeCallbackJpgFileListItem = {
  path: 'http://127.0.0.1:3000/o61e7hi7lg.jpg',
  name: '60x7XxAmaPjzdf3c68a39bcb172c1b03077fc336cca6.jpg',
  fileType: 'image',
  poster: '',
  status: 'done'
};

const changeCallbackMovFileFail = {
  path: 'http://tmp/96NgI6RvT4el6c7340bed691689395e8b6884c366176.mov',
  poster: 'http://tmp/phUChtXGwM3A7fa008fd65cdb63c342aa830c6ffce82.jpg',
  size: 1024 * 1024 * 10,
  name: '96NgI6RvT4el6c7340bed691689395e8b6884c366176.mov',
  duration: 30.571,
  fileType: 'video',
  status: 'fail'
};
const changeCallbackMovFileFailListItemFail = {
  path: 'http://tmp/96NgI6RvT4el6c7340bed691689395e8b6884c366176.mov',
  name: '96NgI6RvT4el6c7340bed691689395e8b6884c366176.mov',
  fileType: 'video',
  poster: 'http://tmp/phUChtXGwM3A7fa008fd65cdb63c342aa830c6ffce82.jpg',
  status: 'fail'
};

const changeCallbackMovFileDone = {
  path: 'http://localhost:3000/fw8d7iehm94.mov',
  poster: 'http://tmp/phUChtXGwM3A7fa008fd65cdb63c342aa830c6ffce82.jpg',
  size: 1024 * 1024 * 10,
  name: '96NgI6RvT4el6c7340bed691689395e8b6884c366176.mov',
  duration: 30.571,
  fileType: 'video',
  status: 'done'
};
const changeCallbackMovFileFailListItemDone = {
  path: 'http://localhost:3000/fw8d7iehm94.mov',
  name: '96NgI6RvT4el6c7340bed691689395e8b6884c366176.mov',
  fileType: 'video',
  poster: 'http://tmp/phUChtXGwM3A7fa008fd65cdb63c342aa830c6ffce82.jpg',
  status: 'done'
};
const value = [
  {
    path: 'http://127.0.0.1:3000/10eosfu51nbd.pdf',
    name: '张三简历.pdf',
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
];
const chooseMessageFileTxt = {
  errMsg: 'chooseMedia:ok',
  type: 'video',
  tempFiles: [
    {
      name: '新建文本文档.txt',
      size: 182,
      time: 1628042622,
      path: 'http://tmp/VuQsdfEznlw9839ecf283b0320efde33df8177caf644.txt',
      type: 'file'
    }
  ]
};
const txtFileUploadSuccess = {
  statusCode: 200,
  data: '{"message":"","code":200,"data":{"path":"http://127.0.0.1:3000/l10o532w1xm.txt"}}',
  errMsg: 'uploadFile:ok'
};
const chooseMediaImageData = {
  type: 'image',
  choose: chooseMediaImage,
  upload: jpgUploadSuccess,
  preview: previewJpg,
  changeCallback: [
    {
      file: changeCallbackJpgFile,
      uploading: false,
      fileList: [changeCallbackJpgFileListItem]
    },
    {
      file: { ...changeCallbackJpgFile, status: 'cancel' },
      uploading: false,
      fileList: []
    }
  ]
};
const chooseMediaVideoErrorData = {
  type: 'video',
  props: { url: 'http://localhost:3000' },
  choose: {
    errMsg: 'chooseMedia:ok',
    type: 'video',
    tempFiles: [chooseVideoMovTempFile]
  },
  uploadKey: '',
  preview: { sources: [previewMov], current: 0 },
  changeCallback: [
    {
      file: changeCallbackMovFileFail,
      uploading: false,
      fileList: [changeCallbackMovFileFailListItemFail]
    },
    {
      file: { ...changeCallbackMovFileFail, status: 'cancel' },
      uploading: false,
      fileList: []
    }
  ]
};
module.exports.data = [
  {
    label: 'chooseMedia',
    list: [
      {
        label: 'image',
        props: {
          url: 'http://localhost:3000'
        },
        ...chooseMediaImageData
      },
      {
        label: '禁止调用方上传-调用方上传',
        props: {
          url: 'http://localhost:3000'
        },
        submit: true,
        ...chooseMediaImageData
      },
      {
        label: '允许调用方上传-调用方上传',
        props: {
          url: 'http://localhost:3000',
          immediately: false
        },
        submit: true,
        ...chooseMediaImageData
      },
      {
        type: 'image',
        label: '默认值 禁用  禁止调用方上传-调用方上传',
        props: {
          url: 'http://localhost:3000',
          disabled: true,
          defaultValue: value
        },
        submit: true,
        choose: chooseMediaImage,
        upload: jpgUploadSuccess,
        preview: {
          sources: [{ url: value[1].path, poster: '', type: 'video' }],
          current: 0
        },
        changeCallback: [
          {
            file: changeCallbackJpgFile,
            uploading: false,
            fileList: [changeCallbackJpgFileListItem]
          },
          {
            file: { ...changeCallbackJpgFile, status: 'cancel' },
            uploading: false,
            fileList: []
          }
        ]
      },
      {
        type: 'image',
        label: '默认值 禁用  允许调用方上传-调用方上传',
        props: {
          url: 'http://localhost:3000',
          disabled: true,
          defaultValue: value,
          immediately: false
        },
        submit: true,
        choose: chooseMediaImage,
        upload: jpgUploadSuccess,
        preview: {
          sources: [{ url: value[1].path, poster: '', type: 'video' }],
          current: 0
        },
        changeCallback: [
          {
            file: changeCallbackJpgFile,
            uploading: false,
            fileList: [changeCallbackJpgFileListItem]
          },
          {
            file: { ...changeCallbackJpgFile, status: 'cancel' },
            uploading: false,
            fileList: []
          }
        ]
      },
      {
        type: 'video',
        label: 'video',
        props: {
          url: 'http://localhost:3000'
        },
        choose: {
          errMsg: 'chooseMedia:ok',
          type: 'video',
          tempFiles: [chooseVideoMovTempFile]
        },
        upload: movUploadSuccess,
        preview: {
          sources: [previewMov],
          current: 0
        },
        changeCallback: [
          {
            file: changeCallbackMovFileDone,
            uploading: false,
            fileList: [changeCallbackMovFileFailListItemDone]
          },
          {
            file: { ...changeCallbackMovFileDone, status: 'cancel' },
            uploading: false,
            fileList: []
          }
        ]
      },
      {
        type: 'video',
        label: 'choose video error  超过最大体积',
        props: {
          url: 'http://localhost:3000'
        },
        choose: {
          errMsg: 'chooseMedia:ok',
          type: 'video',
          tempFiles: [
            {
              tempFilePath: 'http://tmp/96NgI6RvT4el6c7340bed691689395e8b6884c366176.mov',
              size: 1024 * 1024 * 30,
              fileType: 'video',
              duration: 30.571,
              width: 480,
              height: 270,
              thumbTempFilePath: 'http://tmp/phUChtXGwM3A7fa008fd65cdb63c342aa830c6ffce82.jpg'
            }
          ]
        },
        errorMessage: {
          status: 'size',
          message: '超过最大体积'
        },
        upload: movUploadSuccess,
        preview: {
          sources: [previewMov],
          current: 0
        },
        changeCallback: [
          {
            file: {
              path: 'http://localhost:3000/fw8d7iehm94.mov',
              poster: 'http://tmp/phUChtXGwM3A7fa008fd65cdb63c342aa830c6ffce82.jpg',
              size: 709764,
              name: '96NgI6RvT4el6c7340bed691689395e8b6884c366176.mov',
              duration: 30.571,
              fileType: 'video',
              status: 'done'
            },
            uploading: false,
            fileList: [
              {
                path: 'http://localhost:3000/fw8d7iehm94.mov',
                name: '96NgI6RvT4el6c7340bed691689395e8b6884c366176.mov',
                fileType: 'video',
                poster: 'http://tmp/phUChtXGwM3A7fa008fd65cdb63c342aa830c6ffce82.jpg',
                status: 'done'
              }
            ]
          },
          {
            file: {
              path: 'http://localhost:3000/fw8d7iehm94.mov',
              poster: 'http://tmp/phUChtXGwM3A7fa008fd65cdb63c342aa830c6ffce82.jpg',
              size: 709764,
              name: '96NgI6RvT4el6c7340bed691689395e8b6884c366176.mov',
              duration: 30.571,
              fileType: 'video',
              status: 'cancel'
            },
            uploading: false,
            fileList: []
          }
        ]
      },
      {
        type: 'video',
        label: 'choose video error 超过最大数量',
        props: {
          url: 'http://localhost:3000'
        },
        choose: {
          errMsg: 'chooseMedia:ok',
          type: 'video',
          tempFiles: [
            chooseVideoMovTempFile,
            chooseVideoMovTempFile,
            chooseVideoMovTempFile,
            chooseVideoMovTempFile,
            chooseVideoMovTempFile,
            chooseVideoMovTempFile,
            chooseVideoMovTempFile,
            chooseVideoMovTempFile,
            chooseVideoMovTempFile,
            chooseVideoMovTempFile,
            chooseVideoMovTempFile,
            chooseVideoMovTempFile
          ]
        },
        errorMessage: {
          status: 'count',
          message: '超过最大数量'
        },
        upload: movUploadSuccess,
        preview: {
          sources: [previewMov],
          current: 0
        },
        changeCallback: [
          {
            file: changeCallbackMovFileDone,
            uploading: false,
            fileList: [changeCallbackMovFileFailListItemDone]
          },
          {
            file: { ...changeCallbackMovFileDone, status: 'cancel' },
            uploading: false,
            fileList: []
          }
        ]
      },
      {
        type: 'video',
        label: 'upload error video 直接进入错误状态',
        props: {
          url: 'http://localhost:3000'
        },
        choose: {
          errMsg: 'chooseMedia:ok',
          type: 'video',
          tempFiles: [chooseVideoMovTempFile]
        },
        uploadError: true,
        uploadKey: '',
        upload: movUploadSuccess,
        preview: {
          sources: [previewMov],
          current: 0
        },
        changeCallback: [
          {
            file: changeCallbackMovFileFail,
            uploading: false,
            fileList: [changeCallbackMovFileFailListItemFail]
          },
          {
            file: { ...changeCallbackMovFileFail, status: 'cancel' },
            uploading: false,
            fileList: []
          }
        ]
      },
      {
        ...chooseMediaVideoErrorData,
        label: 'upload error video 从success  进错误状态 状态码错误',
        upload: {
          statusCode: 400,
          data: '{"message":"","code":200,"data":{"path":"http://localhost:3000/fw8d7iehm94.mov"}}',
          errMsg: 'uploadFile:ok'
        }
      },

      {
        ...chooseMediaVideoErrorData,
        label: 'upload error video 从success 进错误状态 JSON序列化错误',
        upload: {
          statusCode: 400,
          data: '{"message":"","code":200,"data:{"path:"http://localhost:3000/fw8d7iehm94.mov"}}',
          errMsg: 'uploadFile:ok'
        }
      },
      {
        ...chooseMediaVideoErrorData,
        label: 'upload error video 从success 进错误状态 数据结构错误',
        upload: {
          statusCode: 200,
          data: '[]',
          errMsg: 'uploadFile:ok'
        }
      },
      {
        ...chooseMediaVideoErrorData,
        label: 'upload error video 从success 进错误状态 内置状态码错误',
        upload: {
          statusCode: 200,
          data: '{"message":"","code":400,"data":{"path":"http://localhost:3000/fw8d7iehm94.mov"}}',
          errMsg: 'uploadFile:ok'
        }
      },
      {
        ...chooseMediaVideoErrorData,
        label: 'upload error video 从success 进错误状态 字段错误',
        upload: {
          statusCode: 200,
          data: '{"message":"","code":200,"data":{"path11111":"http://localhost:3000/fw8d7iehm94.mov"}}',
          errMsg: 'uploadFile:ok'
        }
      }
    ]
  },
  {
    label: 'chooseImage',
    list: [
      {
        type: 'image',
        label: 'image',
        props: {
          url: 'http://localhost:3000',
          chooseType: 'chooseImage'
        },
        choose: {
          errMsg: 'chooseImage:ok',
          type: 'image',
          tempFilePaths: ['http://tmp/60x7XxAmaPjzdf3c68a39bcb172c1b03077fc336cca6.jpg'],
          tempFiles: [
            {
              path: 'http://tmp/60x7XxAmaPjzdf3c68a39bcb172c1b03077fc336cca6.jpg',
              size: 18878
            }
          ]
        },
        upload: jpgUploadSuccess,
        preview: previewJpg,
        changeCallback: [
          {
            file: changeCallbackJpgFile,
            uploading: false,
            fileList: [changeCallbackJpgFileListItem]
          },
          {
            file: { ...changeCallbackJpgFile, status: 'cancel' },
            uploading: false,
            fileList: []
          }
        ]
      }
    ]
  },
  {
    label: 'chooseVideo',
    list: [
      {
        type: 'video',
        label: 'video',
        props: {
          url: 'http://localhost:3000',
          chooseType: 'chooseVideo'
        },
        choose: {
          errMsg: 'chooseVideo:ok',
          tempFilePath: 'http://tmp/96NgI6RvT4el6c7340bed691689395e8b6884c366176.mov',
          size: 709764,
          duration: 30.571,
          width: 480,
          height: 270,
          thumbTempFilePath: 'http://tmp/phUChtXGwM3A7fa008fd65cdb63c342aa830c6ffce82.jpg'
        },
        upload: movUploadSuccess,
        preview: {
          sources: [previewMov],
          current: 0
        },
        changeCallback: [
          {
            file: {
              path: 'http://localhost:3000/fw8d7iehm94.mov',
              poster: 'http://tmp/phUChtXGwM3A7fa008fd65cdb63c342aa830c6ffce82.jpg',
              size: 709764,
              name: '96NgI6RvT4el6c7340bed691689395e8b6884c366176.mov',
              duration: 30.571,
              fileType: 'video',
              status: 'done'
            },
            uploading: false,
            fileList: [
              {
                path: 'http://localhost:3000/fw8d7iehm94.mov',
                name: '96NgI6RvT4el6c7340bed691689395e8b6884c366176.mov',
                fileType: 'video',
                poster: 'http://tmp/phUChtXGwM3A7fa008fd65cdb63c342aa830c6ffce82.jpg',
                status: 'done'
              }
            ]
          },
          {
            file: {
              path: 'http://localhost:3000/fw8d7iehm94.mov',
              poster: 'http://tmp/phUChtXGwM3A7fa008fd65cdb63c342aa830c6ffce82.jpg',
              size: 709764,
              name: '96NgI6RvT4el6c7340bed691689395e8b6884c366176.mov',
              duration: 30.571,
              fileType: 'video',
              status: 'cancel'
            },
            uploading: false,
            fileList: []
          }
        ]
      }
    ]
  },
  {
    label: 'chooseMessageFile',
    list: [
      {
        type: 'image',
        label: 'image',
        props: {
          url: 'http://localhost:3000',
          chooseType: 'chooseMessageFile'
        },
        choose: {
          errMsg: 'chooseMessageFile:ok',
          type: 'image',
          tempFiles: [
            {
              name: '60x7XxAmaPjzdf3c68a39bcb172c1b03077fc336cca6.jpg',
              time: 1626078027,
              type: 'image',
              path: 'http://tmp/60x7XxAmaPjzdf3c68a39bcb172c1b03077fc336cca6.jpg',
              size: 18878
            }
          ]
        },
        upload: jpgUploadSuccess,
        preview: previewJpg,
        changeCallback: [
          {
            file: changeCallbackJpgFile,
            uploading: false,
            fileList: [changeCallbackJpgFileListItem]
          },
          {
            file: { ...changeCallbackJpgFile, status: 'cancel' },
            uploading: false,
            fileList: []
          }
        ]
      },
      {
        type: 'video',
        label: 'video',
        props: {
          url: 'http://localhost:3000',
          chooseType: 'chooseMessageFile'
        },
        choose: {
          errMsg: 'chooseMedia:ok',
          type: 'video',
          tempFiles: [
            {
              type: 'video',
              path: 'http://tmp/CJ7FNDZYNil6d6cefa41948aad2adde84fd6c5a24677.mov',
              size: 709764,
              time: 1638601919,
              name: 'fw8d7iehm94.mov'
            }
          ]
        },
        upload: movUploadSuccess,
        preview: {
          sources: [
            {
              url: 'http://localhost:3000/fw8d7iehm94.mov',
              poster: '',
              type: 'video'
            }
          ],
          current: 0
        },
        changeCallback: [
          {
            file: {
              path: 'http://localhost:3000/fw8d7iehm94.mov',
              poster: '',
              size: 709764,
              name: 'fw8d7iehm94.mov',
              duration: 0,
              fileType: 'video',
              status: 'done'
            },
            uploading: false,
            fileList: [
              {
                path: 'http://localhost:3000/fw8d7iehm94.mov',
                name: 'fw8d7iehm94.mov',
                fileType: 'video',
                poster: '',
                status: 'done'
              }
            ]
          },
          {
            file: {
              path: 'http://localhost:3000/fw8d7iehm94.mov',
              poster: '',
              size: 709764,
              name: 'fw8d7iehm94.mov',
              duration: 0,
              fileType: 'video',
              status: 'cancel'
            },
            uploading: false,
            fileList: []
          }
        ]
      },
      {
        type: 'file',
        label: 'file',
        props: {
          url: 'http://localhost:3000',
          chooseType: 'chooseMessageFile'
        },
        choose: chooseMessageFileTxt,
        upload: {
          statusCode: 200,
          data: '{"message":"","code":200,"data":{"path":"http://127.0.0.1:3000/l10o532w1xm.txt"}}',
          errMsg: 'uploadFile:ok'
        },
        preview: null,
        changeCallback: [
          {
            file: {
              path: 'http://127.0.0.1:3000/l10o532w1xm.txt',
              poster: '',
              size: 182,
              name: '新建文本文档.txt',
              duration: 0,
              fileType: 'file',
              status: 'done'
            },
            uploading: false,
            fileList: [
              {
                path: 'http://127.0.0.1:3000/l10o532w1xm.txt',
                name: '新建文本文档.txt',
                fileType: 'file',
                poster: '',
                status: 'done'
              }
            ]
          },
          {
            file: {
              path: 'http://127.0.0.1:3000/l10o532w1xm.txt',
              poster: '',
              size: 182,
              name: '新建文本文档.txt',
              duration: 0,
              fileType: 'file',
              status: 'cancel'
            },
            uploading: false,
            fileList: []
          }
        ]
      }
    ]
  }
];
module.exports.value = value;
module.exports.chooseMediaImage = chooseMediaImage;
module.exports.jpgUploadSuccess = jpgUploadSuccess;
module.exports.changeCallbackJpgFile = changeCallbackJpgFile;

module.exports.customChooseMediaImage = chooseMediaImage;
module.exports.customJpgUploadSuccess = {
  statusCode: 200,
  data: '{"message":"","code":200,"data":{"pathImage":"http://127.0.0.1:3000/o61e7hi7lg.jpg"}}',
  errMsg: 'uploadFile:ok'
};
module.exports.customChangeCallbackJpgFileListItem = changeCallbackJpgFileListItem;

module.exports.customChangeCallbackTxtFileListItem = {
  path: 'http://127.0.0.1:3000/l10o532w1xm.txt',
  name: '新建文本文档.txt',
  fileType: 'file',
  poster: '',
  status: 'done'
};

module.exports.customChooseMessageFileTxt = chooseMessageFileTxt;
module.exports.customTxtFileUploadSuccess = txtFileUploadSuccess;
