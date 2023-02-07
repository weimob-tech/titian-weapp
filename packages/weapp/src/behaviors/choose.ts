import { UploadApiEnum, UploadCamera, UploadFile, UploadStatus, UploadType } from '../common/interface/uploader';
import { filterInvalidData, randomString } from '../common/utils/index';

export default Behavior({
  properties: {
    chooseText: { type: String, value: '上传图片' },
    chooseIcon: { type: String, value: 'plus' },
    useChooseSlot: Boolean,
    chooseType: {
      type: String,
      value: UploadApiEnum.CHOOSEMEDIA
    },
    sizeType: {
      type: Array,
      value: ['original', 'compressed'] // type 为 image 有效  original': 原图; 'compressed': 压缩图
    },
    sourceType: {
      type: Array,
      value: ['album', 'camera'] // type 为 media/image/video 有效  album': 从相册选图; 'camera': 使用相机
    },
    camera: {
      type: String,
      value: UploadCamera.BACK
    },
    maxDuration: {
      type: Number,
      value: 10
    },
    count: {
      type: Number,
      value: 9
    },
    mediaType: {
      type: Array,
      value: ['image', 'video']
    },
    type: {
      type: String,
      value: 'all'
    },
    extension: {
      type: Array,
      value: []
    },
    compressed: Boolean, // type = video 有效
    beforeChoose: null,
    afterChoose: null,
    maxSize: { type: Number, value: 1024 * 1024 * 20 }
  },
  methods: {
    chooseByType(fileKeyList: string[], fileMap: { [key: string]: UploadFile }) {
      let params: Partial<{
        chooseType: UploadApiEnum;
        sourceType: Array<'album' | 'camera'>;
        sizeType: Array<'original' | 'compressed'>;
        camera: UploadCamera;
        count: number;
        maxDuration: number;
        compressed: boolean;
        type: 'image' | 'video' | 'file' | 'all';
        extension: string[];
      }> = {};
      if (typeof this.data.beforeChoose === 'function') {
        params = this.data.beforeChoose(
          fileKeyList.map((key) => fileMap[key]),
          this
        );
      }
      const chooseType = (params.chooseType || this.data.chooseType) as UploadApiEnum;
      const count = params.count || this.data.count;
      const sourceType = params.sourceType || this.data.sourceType;
      const sizeType = params.sizeType || this.data.sizeType;
      const maxDuration = params.maxDuration || this.data.maxDuration;
      const camera = params.camera || (this.data.camera as UploadCamera | undefined);
      const compressed = params.compressed || this.data.compressed;
      const type = (params.type || this.data.type) as 'image' | 'video' | 'file' | 'all';
      const extension = params.extension || this.data.extension;
      const diff = count - fileKeyList.length;
      return this.choseFile({
        chooseType,
        count: diff > 9 ? 9 : diff,
        sizeType,
        maxDuration,
        camera,
        compressed,
        sourceType,
        type,
        extension
      })
        .then(
          (
            res:
              | WechatMiniprogram.ChooseVideoSuccessCallbackResult
              | WechatMiniprogram.ChooseImageSuccessCallbackResult
              | WechatMiniprogram.ChooseMediaSuccessCallbackResult
              | WechatMiniprogram.ChooseMessageFileSuccessCallbackResult
          ) => {
            if (chooseType === UploadApiEnum.CHOOSEIMAGE) {
              return (res as WechatMiniprogram.ChooseImageSuccessCallbackResult).tempFiles.map((item) => {
                const paths = item.path.split('/');
                return {
                  path: item.path,
                  poster: '',
                  size: item.size,
                  name: paths[paths.length - 1],
                  duration: 0,
                  fileType: UploadType.IMAGE,
                  status: UploadStatus.CHOSE,
                  key: randomString()
                } as UploadFile;
              });
            }
            if (chooseType === UploadApiEnum.CHOOSEVIDEO) {
              const { tempFilePath, size, duration, thumbTempFilePath } =
                res as WechatMiniprogram.ChooseVideoSuccessCallbackResult & {
                  thumbTempFilePath: string;
                };
              const paths = tempFilePath.split('/');
              return [
                {
                  path: tempFilePath,
                  poster: thumbTempFilePath,
                  size,
                  duration,
                  name: paths[paths.length - 1],
                  fileType: UploadType.VIDEO,
                  status: UploadStatus.CHOSE,
                  key: randomString()
                } as UploadFile
              ];
            }
            if (chooseType === UploadApiEnum.CHOOSEMEDIA) {
              const result: WechatMiniprogram.ChooseMediaSuccessCallbackResult =
                res as WechatMiniprogram.ChooseMediaSuccessCallbackResult;
              return result.tempFiles.map((item) => {
                const paths = item.tempFilePath.split('/');
                return {
                  path: item.tempFilePath,
                  poster: item.thumbTempFilePath || '',
                  size: item.size,
                  name: paths[paths.length - 1],
                  duration: item.duration || 0,
                  fileType: item.fileType || result.type,
                  status: UploadStatus.CHOSE,
                  key: randomString()
                } as UploadFile;
              });
            }
            return (res as WechatMiniprogram.ChooseMessageFileSuccessCallbackResult).tempFiles.map(
              (item) =>
                ({
                  path: item.path,
                  poster: '',
                  size: item.size,
                  name: item.name,
                  duration: 0,
                  fileType: item.type,
                  status: UploadStatus.CHOSE,
                  key: randomString()
                } as UploadFile)
            );
          }
        )
        .then((res: UploadFile[]) => {
          if (typeof this.data.afterChoose === 'function') {
            return this.data.afterChoose(
              res,
              fileKeyList.map((key) => fileMap[key])
            );
          }
          return res;
        });
    },
    choseFile({
      chooseType,
      count,
      sizeType,
      maxDuration,
      camera,
      compressed,
      sourceType,
      type,
      extension
    }: {
      chooseType: UploadApiEnum;
      sourceType?: Array<'album' | 'camera'>;
      sizeType?: Array<'original' | 'compressed'>;
      camera?: UploadCamera;
      count: number;
      maxDuration: number;
      compressed: boolean;
      type: 'image' | 'video' | 'file' | 'all';
      extension: string[];
    }) {
      switch (chooseType) {
        case UploadApiEnum.CHOOSEIMAGE:
          return wx.chooseImage(
            filterInvalidData({
              count,
              sourceType,
              camera,
              sizeType
            })
          );
        case UploadApiEnum.CHOOSEVIDEO:
          return wx.chooseVideo(
            filterInvalidData({
              sourceType,
              compressed,
              maxDuration,
              camera
            })
          );
        case UploadApiEnum.CHOOSEMEDIA:
          return wx.chooseMedia(
            filterInvalidData({
              count,
              sourceType,
              maxDuration,
              mediaType: this.data.mediaType as ('image' | 'video')[],
              sizeType,
              camera
            })
          );
        case UploadApiEnum.CHOOSEMESSAGEFILE:
          return wx.chooseMessageFile(
            filterInvalidData({
              type,
              count,
              extension: Array.isArray(extension) && extension.length > 0 && type === 'file' ? extension : undefined
            })
          );
        default:
          throw new Error('UploadType not support');
      }
    },
    choose(fileKeyList: string[], map: { [key: string]: UploadFile }) {
      return this.chooseByType(fileKeyList, map).then((res: UploadFile[]) => {
        if (res.length + fileKeyList.length > this.data.count) {
          this.triggerEvent('error', {
            status: 'count',
            message: '超过最大数量'
          });
          return null;
        }
        if (res.some((item) => item.size > this.data.maxSize)) {
          this.triggerEvent('error', {
            status: 'size',
            message: '超过最大体积'
          });
          return null;
        }
        return res;
      });
    }
  }
});
