/// <reference types="miniprogram-api-typings" />
/// <reference types="miniprogram-api-typings" />
export interface ModalOptions {
    visible?: boolean;
    type?: string;
    overlay?: boolean;
    zIndex?: number;
    context?: WechatMiniprogram.Component.TrivialInstance | WechatMiniprogram.Page.TrivialInstance;
    position?: string;
    duration?: number;
    selector?: string;
    onClose?: () => void;
    [key: string]: unknown;
}
type noop = () => void;
export default class Modal {
    node: WechatMiniprogram.Component.TrivialInstance | null;
    options: ModalOptions | null;
    constructor(modalOptions: ModalOptions);
    close(): WechatMiniprogram.Component.TrivialInstance | null;
    setData(data: {
        [key: string]: any;
    }, callback?: noop): void;
    open(): WechatMiniprogram.Component.TrivialInstance | null;
    clear(): WechatMiniprogram.Component.TrivialInstance | null;
}
export {};
