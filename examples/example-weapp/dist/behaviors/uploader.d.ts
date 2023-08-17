/// <reference types="miniprogram-api-typings" />
/// <reference types="miniprogram-api-typings" />
/// <reference types="miniprogram-api-typings" />
import { UploadFile } from '../common/interface/uploader';
export type UploaderData = {
    fileKeyList: string[];
    scheduleObj: {
        [key: string]: number;
    };
    fileMap: {
        [key: string]: UploadFile;
    };
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
    scheduleObj: {
        [key: string]: number;
    };
    fileMap: {
        [key: string]: UploadFile;
    };
    uploadNumber: number;
    schedule: {
        [key: string]: WechatMiniprogram.UploadTask;
    };
};
export type WechatMiniprogramUploaderType = WechatMiniprogram.Behavior.Options<UploaderData, WechatMiniprogram.Component.PropertyOption, UploaderMethod, UploaderThis>;
declare const _default: string;
export default _default;
