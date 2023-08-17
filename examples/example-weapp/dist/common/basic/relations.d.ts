/// <reference types="miniprogram-api-typings" />
type TrivialInstance = WechatMiniprogram.Component.TrivialInstance;
export declare const convertParentNode: (name: string, action?: ((target: WechatMiniprogram.Component.TrivialInstance, type: string) => void) | undefined) => {
    relations: {
        [x: string]: WechatMiniprogram.Component.RelationOption;
    };
    behavior: string;
};
export declare const convertChildrenNode: (name: string | string[], action?: ((target: TrivialInstance, type: string) => void) | undefined) => {
    relations: Record<string, WechatMiniprogram.Component.RelationOption>;
    behavior: string;
};
export {};
