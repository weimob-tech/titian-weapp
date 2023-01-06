import { UploadFile, UploadLoadComponentType, UploadStatus } from '../common/interface/uploader';

export type UploaderData = {
  fileKeyList: string[];
  scheduleObj: { [key: string]: number };
  fileMap: { [key: string]: UploadFile };
};

export type UploaderMethod = {
  setUploadStatus(): Promise<void>;
  setUploadParams(file: UploadFile): Partial<WechatMiniprogram.UploadFileOption>;
  uploadFileList(): void;
  uploadFile(fileKey: string): void;
  uploadSuccess(fileKey: string, res: WechatMiniprogram.UploadFileSuccessCallbackResult): void;
  uploadFail(fileKey: string): void;
  uploadComplete(fileKey: string): void;
  uploadPurogressUpdate(fileKey: string, uploadTask: WechatMiniprogram.UploadTask): void;
  cacalUploadFile(fileKey: string): void;
  change(file?: UploadFile): void;
};

export type UploaderThis = {
  scheduleObj: { [key: string]: number };
  fileMap: { [key: string]: UploadFile };
  uploadNumber: number;
  schedule: { [key: string]: WechatMiniprogram.UploadTask };
};
export type WechatMiniprogramUploaderType = WechatMiniprogram.Behavior.Options<
  UploaderData,
  WechatMiniprogram.Component.PropertyOption,
  UploaderMethod,
  UploaderThis
>;
const uploaderBehavior: WechatMiniprogramUploaderType = {
  properties: {
    url: String,
    beforeUpload: null,
    upload: null,
    afterUpload: null,
    complete: null,
    uploadExercise: { type: String, value: UploadLoadComponentType.LOADING },
    uploadExerciseText: { type: String, value: '上传中' },
    uploadFailText: { type: String, value: '上传失败' },

    imageParams: { type: Object, value: {} },
    videoParams: { type: Object, value: {} },
    fileParams: { type: Object, value: {} },

    imageResultFormat: { type: Array, value: [] },
    videoResultFormat: { type: Array, value: [] },
    fileResultFormat: { type: Array, value: [] }
  },
  lifetimes: {
    created() {
      this.schedule = {};
      this.scheduleObj = {};
      this.fileMap = {};

      this.uploadNumber = 0;
    },
    detached() {
      const { schedule } = this;
      Object.keys(schedule).forEach((key) => {
        const uploadTask = schedule[key];
        if (uploadTask && typeof uploadTask.abort === 'function') {
          uploadTask.abort();
        }
      });
      this.schedule = {};
    }
  },
  data: {
    fileKeyList: [],
    scheduleObj: {},
    fileMap: {}
  },
  methods: {
    setUploadStatus() {
      Object.keys(this.fileMap).forEach((key) => {
        const file = this.fileMap[key];
        if (file.status === UploadStatus.CHOSE) {
          file.status = UploadStatus.UPLOAD;
        }
      });
      return new Promise((resolve) => {
        this.setData(
          {
            fileMap: this.fileMap
          },
          resolve as () => void
        );
      });
    },
    setUploadParams(file: UploadFile) {
      const { beforeUpload, url, fileKeyList, imageParams = {}, videoParams, fileParams } = this.data;

      let params = {
        url,
        name: 'file',
        header: { 'content-type': 'multipart/form-data' }
      };
      if (typeof beforeUpload === 'function') {
        params = beforeUpload(
          params,
          file,
          fileKeyList.map((key) => this.fileMap[key])
        );
      } else if (file.fileType === 'image') {
        params = { ...params, ...(imageParams || {}) };
      } else if (file.fileType === 'video') {
        params = { ...params, ...(videoParams || {}) };
      } else {
        params = { ...params, ...(fileParams || {}) };
      }

      return params;
    },
    uploadFileList() {
      Object.keys(this.fileMap).forEach((itemKey) => {
        const file = this.fileMap[itemKey];
        if (file.status !== UploadStatus.UPLOAD) {
          return;
        }
        this.uploadNumber += 1;
        if (typeof this.data.upload === 'function') {
          this.data.upload(this, file.key);
          return;
        }
        this.uploadFile(file.key);
      });
    },
    uploadFile(fileKey: string) {
      const file = this.fileMap[fileKey];
      const params = this.setUploadParams(file);
      if (!params.url) {
        throw new Error('url is required');
      }
      const uploadTask = wx.uploadFile({
        ...params,
        filePath: file.path,
        success: this.uploadSuccess.bind(this, fileKey),
        fail: this.uploadFail.bind(this, fileKey),
        complete: this.uploadComplete.bind(this, fileKey)
      } as WechatMiniprogram.UploadFileOption);
      this.uploadPurogressUpdate(fileKey, uploadTask);
    },
    cacalUploadFile(fileKey: string) {
      const { fileKeyList, complete } = this.data;
      if (fileKeyList.findIndex((item) => item === fileKey) === -1) {
        return;
      }
      const file = this.fileMap[fileKey];
      const fileList = fileKeyList.filter((item) => item !== fileKey);
      if (file.status === UploadStatus.UPLOAD) {
        this.schedule[fileKey]?.abort();
        this.uploadNumber -= 1;
        if (this.uploadNumber < 0) {
          this.uploadNumber = 0;
        }
      }
      delete this.fileMap[fileKey];
      delete this.schedule[fileKey];
      delete this.scheduleObj[fileKey];
      file.status = UploadStatus.CACAL;

      if (typeof complete === 'function') {
        const custom = complete(
          file,
          fileList.map((key) => this.fileMap[key]),
          'delete'
        );
        if (Array.isArray(custom)) {
          this.fileMap = custom.reduce((prev, next) => {
            prev[next.key] = next;
            return prev;
          }, {});
        }
      }
      this.setData(
        {
          fileMap: this.fileMap,
          scheduleObj: this.scheduleObj,
          fileKeyList: fileList
        },
        () => {
          this.change(file);
        }
      );
    },
    uploadComplete(fileKey: string) {
      this.uploadNumber -= 1;
      if (this.uploadNumber < 0) {
        this.uploadNumber = 0;
      }
      const { fileKeyList, complete } = this.data;
      if (typeof complete === 'function') {
        const custom = complete(
          this.fileMap[fileKey],
          fileKeyList.map((key) => this.fileMap[key]),
          'upload'
        );
        if (Array.isArray(custom)) {
          this.fileMap = custom.reduce((prev, next) => {
            prev[next.key] = next;
            return prev;
          }, {});

          this.setData({ fileMap: this.fileMap }, () => this.change(this.fileMap[fileKey]));
          return;
        }
      }

      this.change(this.fileMap[fileKey]);
    },
    uploadFail(fileKey: string) {
      this.fileMap[fileKey] = {
        ...this.fileMap[fileKey],
        status: UploadStatus.FAIL
      };
      this.scheduleObj[fileKey] = 0;
      this.setData({
        fileMap: this.fileMap,
        scheduleObj: this.scheduleObj
      });
    },

    /** 上传进度处理 */
    uploadPurogressUpdate(fileKey: string, uploadTask: WechatMiniprogram.UploadTask) {
      uploadTask.onProgressUpdate(({ progress }) => {
        this.scheduleObj[fileKey] = progress;
        this.setData({
          scheduleObj: this.scheduleObj
        });
      });
      this.schedule[fileKey] = uploadTask;
    },

    uploadSuccess(fileKey: string, res: WechatMiniprogram.UploadFileSuccessCallbackResult) {
      const { afterUpload, imageResultFormat, videoResultFormat, fileResultFormat } = this.data;
      if (typeof afterUpload === 'function') {
        const afterParams = afterUpload(res, this.fileMap[fileKey], this.fileMap);
        this.scheduleObj[fileKey] = 0;
        this.fileMap[fileKey] = {
          ...this.fileMap[fileKey],
          status: UploadStatus.DONE,
          ...afterParams
        };
        this.setData({ fileMap: this.fileMap, scheduleObj: this.scheduleObj });
        return;
      }
      if (res.statusCode !== 200) {
        this.uploadFail(fileKey);
        return;
      }
      let result: {
        path?: string;
        poster?: string;
      } = {
        path: ''
      };
      let response: { [key: string]: unknown } = {};
      const responseStr = res.data;
      try {
        response = JSON.parse(responseStr);
      } catch (e) {
        result.path = res.data || '';
      }
      let formatList: string[] = [];
      if (this.fileMap[fileKey].fileType === 'image') {
        formatList = imageResultFormat;
      } else if (this.fileMap[fileKey].fileType === 'video') {
        formatList = videoResultFormat;
      } else {
        formatList = fileResultFormat;
      }
      formatList = formatList.filter(Boolean);
      if (formatList.length > 0) {
        try {
          result.path = formatList.reduce(
            (target, key) => target[key] as typeof response,
            response
          ) as unknown as string;
        } catch (e) {
          // eslint-disable-next-line no-console
          console.warn('format error', e);
        }
      }
      if (!result.path) {
        if (typeof response === 'string') {
          result = {
            path: response
          };
        } else if (
          typeof response === 'object' &&
          response &&
          response.code === 200 &&
          typeof response.data === 'object' &&
          typeof (response.data as { [key: string | number]: unknown }).path === 'string'
        ) {
          result = response.data as {
            path?: string;
            poster?: string;
          };
        } else {
          this.uploadFail(fileKey);
          return;
        }
      }
      this.scheduleObj[fileKey] = 0;
      this.fileMap[fileKey] = {
        ...this.fileMap[fileKey],
        ...result,
        status: UploadStatus.DONE
      };
      this.setData({
        fileMap: this.fileMap,
        scheduleObj: this.scheduleObj
      });
    },
    change() {}
  }
};
export default Behavior(uploaderBehavior);
