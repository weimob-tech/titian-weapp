/// <reference types="miniprogram-api-typings" />
/// <reference types="miniprogram-api-typings" />
type ToastProps = {
    selector: string;
    ctx: WechatMiniprogram.Page.Instance<WechatMiniprogram.IAnyObject, WechatMiniprogram.IAnyObject>;
    filter: (str?: string) => string;
};
type DialogProps = {
    selector: string;
    ctx: WechatMiniprogram.Page.Instance<WechatMiniprogram.IAnyObject, WechatMiniprogram.IAnyObject>;
};
export declare const getContext: ({ selector, ctx }: ToastProps | DialogProps) => {};
export declare const $tiDialog: (opt?: Partial<DialogProps>) => {};
export declare function $tiToast(opt?: Partial<ToastProps>): {};
export declare namespace $tiToast {
    var addFilter: (cb?: ((str?: string | undefined) => string) | undefined) => (str?: string | undefined) => string | undefined;
}
export declare const $toastFilter: (cb?: ((str?: string) => string) | undefined) => (str?: string) => string | undefined;
export {};
