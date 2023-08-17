export var UploadType;
(function(UploadType) {
    UploadType["IMAGE"] = 'image';
    UploadType["VIDEO"] = 'video';
    UploadType["MEDIA"] = 'media';
    UploadType["FILE"] = 'file';
})(UploadType || (UploadType = {}));
export var UploadApiEnum;
(function(UploadApiEnum) {
    UploadApiEnum[/** wx.chooseImage */ "CHOOSEIMAGE"] = 'chooseImage';
    UploadApiEnum[/** wx.chooseVideo */ "CHOOSEVIDEO"] = 'chooseVideo';
    UploadApiEnum[/** wx.chooseMedia */ "CHOOSEMEDIA"] = 'chooseMedia';
    UploadApiEnum[/** wx.chooseMessageFile */ "CHOOSEMESSAGEFILE"] = 'chooseMessageFile';
})(UploadApiEnum || (UploadApiEnum = {}));
export var UploadActionType;
(function(UploadActionType) {
    UploadActionType["SMALL"] = 'small';
    UploadActionType["LARGE"] = 'large';
})(UploadActionType || (UploadActionType = {}));
export var UploadStatus;
(function(UploadStatus) {
    UploadStatus[/** 已选择 */ "CHOSE"] = 'chose';
    UploadStatus[/** 上传中 */ "UPLOAD"] = 'upload';
    UploadStatus[/** 上传完成 */ "DONE"] = 'done';
    UploadStatus[/** 上传失败 */ "FAIL"] = 'fail';
    UploadStatus[/** 取消上传 */ "CANCEL"] = 'cancel';
})(UploadStatus || (UploadStatus = {}));
export var UploadLoadComponentType;
(function(UploadLoadComponentType) {
    UploadLoadComponentType[/** 上传状态:无 */ "NULL"] = '';
    UploadLoadComponentType[/** 上传状态:LOADING */ "LOADING"] = 'loading';
    UploadLoadComponentType[/** 上传状态:PROGRESS */ "PROGRESS"] = 'progress';
})(UploadLoadComponentType || (UploadLoadComponentType = {}));
export var UploadCamera;
(function(UploadCamera) {
    UploadCamera[/** 后置摄像头 */ "BACK"] = 'back';
    UploadCamera[/** 前置摄像头 */ "FRONT"] = 'front';
})(UploadCamera || (UploadCamera = {}));
