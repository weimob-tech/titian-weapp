/**
 * TODO:
 * 1. 要素过多，配置过于复杂，需要简化
 * 2. 简化方向:分割出choose组件,与upload组件做父子关联,也可将缩略图功能独立成组件
 */ import chooseBehavior from '../behaviors/choose';
import uploaderBehavior from '../behaviors/uploader';
import BasicComponent from '../common/basic/BasicComponent';
import { UploadActionType, UploadStatus, UploadType } from '../common/interface/uploader';
import { randomString } from '../common/utils/index';
BasicComponent({
    externalClasses: [
        'ext-thum-box-class',
        'ext-thum-class',
        'ext-thum-tip-class',
        'ext-thum-image-class',
        'ext-thum-video-class',
        'ext-thum-other-class',
        'ext-action-class'
    ],
    properties: {
        defaultValue: {
            type: Array,
            value: []
        },
        value: {
            type: null,
            observer (newVal) {
                if (!Array.isArray(newVal)) {
                    return;
                }
                this.controlled = true;
                this.updateData(newVal);
            }
        },
        immediately: {
            type: Boolean,
            value: true
        },
        size: {
            type: String,
            value: UploadActionType.SMALL
        },
        disabled: Boolean,
        extStyle: String,
        immediatelyChoose: {
            type: Boolean,
            value: true
        },
        reverse: {
            type: Boolean,
            value: false
        },
        cols: Number
    },
    behaviors: [
        uploaderBehavior,
        chooseBehavior
    ],
    lifetimes: {
        created () {
            this.controlled = false;
        },
        ready () {
            if (!this.controlled) {
                const { defaultValue  } = this.data;
                if (defaultValue.length > 0) {
                    this.updateData(defaultValue);
                }
            }
        }
    },
    methods: {
        updateData (value) {
            const list = value.map((item)=>({
                    ...item,
                    key: typeof item.key !== 'undefined' ? item.key : randomString()
                }));
            this.fileMap = {};
            list.reduce((pre, cur)=>{
                pre[cur.key] = cur;
                return pre;
            }, this.fileMap);
            Object.keys(this.schedule || {}).forEach((key)=>{
                const uploadTask = this.schedule[key];
                if (uploadTask && typeof uploadTask.abort === 'function') {
                    uploadTask.abort();
                }
            });
            this.schedule = {};
            this.scheduleObj = {};
            this.uploadNumber = 0;
            this.setData({
                fileMap: this.fileMap,
                fileKeyList: list.map((item)=>item.key),
                scheduleObj: {}
            });
        },
        onSelect (event) {
            this.triggerEvent('click-plus');
            const { fileKeyList , disabled , immediately , immediatelyChoose  } = this.data;
            if (disabled) {
                return;
            }
            if (!immediatelyChoose && event && event.type === 'tap') {
                this.triggerEvent('choose');
                return;
            }
            this.choose(this.data.fileKeyList, this.fileMap).then((res)=>{
                if (!res) {
                    return;
                }
                if (this.controlled) {
                    this.triggerEvent('change', {
                        file: null,
                        uploading: false,
                        fileList: this.data.fileKeyList.map((fileName)=>{
                            const { size , duration , key , ...other } = this.fileMap[fileName];
                            return other;
                        }).concat(res.map((file)=>({
                                path: file.path,
                                name: file.name,
                                fileType: file.fileType,
                                poster: file.poster,
                                status: file.status
                            })))
                    });
                    return;
                }
                res.reduce((pre, cur)=>{
                    pre[cur.key] = cur;
                    return pre;
                }, this.fileMap);
                this.setData({
                    fileKeyList: [
                        ...fileKeyList,
                        ...res.map((item)=>item.key)
                    ],
                    fileMap: this.fileMap
                }, ()=>{
                    // 状态翻转
                    this.change();
                    if (this.data.disabled) {
                        return;
                    }
                    if (immediately) {
                        this.setUploadStatus().then(()=>{
                            // 状态翻转
                            this.change();
                            this.uploadFileList();
                        });
                    }
                });
            }).catch((err)=>{
                this.triggerEvent('error', {
                    status: 'other',
                    message: err.errMsg
                });
            });
        },
        onPreviewImage (event) {
            const { path  } = event.currentTarget.dataset;
            const { fileKeyList  } = this.data;
            const { fileMap  } = this;
            wx.previewImage({
                urls: fileKeyList.filter((item)=>fileMap[item].fileType === UploadType.IMAGE && fileMap[item].status !== UploadStatus.FAIL).map((item)=>fileMap[item].path),
                current: path,
                fail: ()=>{
                    this.triggerEvent('error', {
                        status: 'previewImage',
                        message: '预览图片失败'
                    });
                }
            });
        },
        onPreviewVideo (event) {
            const { key  } = event.currentTarget.dataset;
            const { fileKeyList  } = this.data;
            const { fileMap  } = this;
            const video = fileKeyList.filter((item)=>fileMap[item].fileType === UploadType.VIDEO && fileMap[item].status !== UploadStatus.FAIL);
            const index = video.findIndex((item)=>fileMap[item].key === key);
            wx.previewMedia({
                sources: video.map((item)=>({
                        url: fileMap[item].path,
                        poster: fileMap[item].poster,
                        type: 'video'
                    })),
                current: index,
                fail: ()=>{
                    this.triggerEvent('error', {
                        status: 'previewMedia',
                        message: '预览视频失败'
                    });
                }
            });
        },
        onDelete (event) {
            if (this.data.disabled) {
                return;
            }
            const { key  } = event.currentTarget.dataset;
            this.cacalUploadFile(key);
        },
        change (file) {
            let changefile = null;
            if (file) {
                const { key , ...otherFile } = file;
                changefile = otherFile;
            }
            this.triggerEvent('change', {
                file: changefile,
                uploading: this.uploadNumber > 0,
                fileList: this.data.fileKeyList.map((fileName)=>{
                    const { size , duration , key , ...other } = this.fileMap[fileName];
                    return other;
                })
            });
        },
        submit () {
            if (this.data.disabled) {
                return;
            }
            const { immediately  } = this.data;
            if (immediately) {
                return;
            }
            this.setUploadStatus().then(()=>{
                this.change();
                this.uploadFileList();
            });
        }
    }
});
