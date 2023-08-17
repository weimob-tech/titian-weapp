import type { LoadOptions } from 'miniprogram-simulate';
import simulate from 'miniprogram-simulate';
export declare const getComponentId: (componentName: string | (WechatMiniprogram.Component.Options<WechatMiniprogram.Component.DataOption, WechatMiniprogram.Component.PropertyOption, WechatMiniprogram.Component.MethodOption> & LoadOptions & {
    id?: string;
    tagName?: string;
    template?: string;
}), loadProps?: LoadOptions) => any;
export declare const getComponent: (componentName: string, props?: Partial<WechatMiniprogram.Component.PropertyOptionToData<WechatMiniprogram.Component.PropertyOption>>, loadProps?: object) => simulate.RootComponent<WechatMiniprogram.Component.DataOption, WechatMiniprogram.Component.PropertyOption, WechatMiniprogram.Component.MethodOption>;
