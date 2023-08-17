/// <reference types="miniprogram-api-typings" />
/// <reference types="miniprogram-api-typings" />
type TrivialInstance = WechatMiniprogram.Component.TrivialInstance;
export type BasicComponentOptions<Data extends WechatMiniprogram.Component.DataOption, Props extends WechatMiniprogram.Component.PropertyOption, Methods extends WechatMiniprogram.Component.MethodOption, Property extends WechatMiniprogram.IAnyObject> = {
    data?: Data;
    properties?: Props;
    methods?: Methods;
    observers?: WechatMiniprogram.Component.OtherOption['observers'];
    behaviors?: WechatMiniprogram.Component.OtherOption['behaviors'];
    relations?: Record<string, WechatMiniprogram.Component.RelationOption>;
    externalClasses?: string[];
    parent?: string;
    children?: string | string[];
    relationAction?: (target: WechatMiniprogram.Component.TrivialInstance, type: string) => void;
    options?: WechatMiniprogram.Component.OtherOption['options'];
    pageLifetimes?: Partial<WechatMiniprogram.Component.PageLifetimes>;
} & Partial<WechatMiniprogram.Component.Lifetimes> & ThisType<{
    parent?: TrivialInstance;
    children?: TrivialInstance[];
    index: number;
} & WechatMiniprogram.Component.Instance<Data & Record<string, any>, Props, Methods, Property> & WechatMiniprogram.Component.Lifetimes & Record<string, any>>;
export {};
