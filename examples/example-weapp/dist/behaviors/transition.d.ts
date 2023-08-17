/// <reference types="miniprogram-api-typings" />
/// <reference types="miniprogram-api-typings" />
import { PropertyToData } from '../common/interface/index';
declare enum TransitionStatus {
    enter = 0,
    exit = 1
}
export type TransitionProps = WechatMiniprogram.Component.PropertyOption & {
    /**
     * 自定义样式
     *
     * @default
     * @since 1.9.0
     * @type {string}
     * @memberof TransitionProps
     * */
    extStyle?: PropertyToData<StringConstructor>;
    /**
     * 是否显示
     *
     * @default false
     * @since 0.1.0
     * @type boolean
     * @memberof TransitionProps
     * */
    show?: PropertyToData<BooleanConstructor>;
    /**
     * 过渡动画时间
     *
     * @date
     * @default 300
     * @since 0.1.0
     * @type number | { enter?: number; exit?: number }
     * @memberof TransitionProps
     * */
    timeout?: PropertyToData<NumberConstructor | null>;
    /**
     * 过渡动画名称
     *
     * @default 'fade'
     * @since 0.1.0
     * @type string
     * @member TransitionProps
     * */
    name?: PropertyToData<StringConstructor | null>;
    /**
     * 入场动画类型
     *
     * @default 'enter'
     * @since 0.1.0
     * @type string
     * @memberof TransitionProps
     * */
    enterName?: PropertyToData<StringConstructor>;
    /**
     * 出场动画类型
     *
     * @default ''
     * @since 0.1.0
     * @type string
     * @memberof TransitionProps
     * */
    exitName?: PropertyToData<StringConstructor>;
    /**
     * 退出时是否移除节点
     *
     * @default false
     * @since 0.1.0
     * @type {boolean}
     * @memberof TransitionProps
     * */
    destroyOnExit?: PropertyToData<BooleanConstructor>;
    /**
     * 过渡动画方法
     *
     * @default linear
     * @since 0.1.0
     * @type string
     * @memberof TransitionProps
     * */
    timingFunction?: PropertyToData<StringConstructor>;
};
export type TransitionOptions = WechatMiniprogram.Component.DataOption & {
    /**
     * 过渡动画名称
     *
     * @default 'fade'
     * @since 0.1.0
     * @type string
     * @memberof TransitionOptions
     * */
    name?: WechatMiniprogram.Component.PropertyToData<StringConstructor>;
    /**
     * 过渡动画方法
     *
     * @default linear
     * @since 0.1.0
     * @type string
     * @memberof TransitionProps
     * */
    timingFunction?: WechatMiniprogram.Component.PropertyToData<StringConstructor> | unknown;
    /**
     * 过渡动画时间
     *
     * @default 300
     * @since 0.1.0
     * @type number | { enter?: number; exit?: number }
     * @memberof TransitionProps
     * */
    duration?: WechatMiniprogram.Component.PropertyToData<NumberConstructor> | number;
};
export type TransitionData = {
    /**
     * 类名列表
     *
     * @default ''
     * @since 0.1.0
     * @type string
     * @memberof TransitionData
     * */
    classes?: string;
    /**
     * 是否被初始化
     *
     * @default false
     * @since 0.1.0
     * @type boolean
     * @memberof TransitionData
     * */
    initialized?: boolean;
    /**
     * 是否展示元素节点
     *
     * @default false
     * @since 0.1.0
     * @type boolean
     * @memberof TransitionData
     * */
    display?: boolean;
    duration?: number;
} & Pick<TransitionOptions, 'duration'>;
export type TransitionMethods = {
    /**
     * 进入过渡动画
     *
     * @since 0.1.0
     * @memberof TransitionMethods
     * */
    enter(): void;
    /**
     * 退出过渡动画
     *
     * @since 0.1.0
     * @memberof TransitionMethods
     * */
    exit(): void;
    /**
     * 切换过渡动画
     *
     * @param newValue 新的值 true: enter, false: exit
     * @param oldValue 旧的值 true: enter, false: exit
     * @since 0.1.0
     * @memberof TransitionMethods
     * */
    toggleShow(newValue: boolean, oldValue: boolean): void;
    /**
     * 过渡动画完成操作
     *
     * @param event CustomEvent
     * @since 0.1.0
     * @memberof TransitionMethods
     * */
    onTransitionEnd(): void;
};
export type TransitionCustomInstanceProperty = {
    /**
     * 过渡动画是否完成
     *
     * @default false
     * @since 0.1.0
     * @memberof TransitionCustomInstanceProperty
     * */
    transitionEnd: boolean;
    /**
     * 过渡动画所处状态
     *
     * @default exit
     * @since 0.1.0
     * @memberof TransitionCustomInstanceProperty
     * */
    status: TransitionStatus;
};
export type TransitionInstance = WechatMiniprogram.Behavior.Instance<TransitionData, TransitionProps, any, TransitionCustomInstanceProperty>;
/**
 * 过渡动画
 *
 * @param {TransitionOptions} options 过渡动画参数
 * @since 0.1.0
 * @example
 * behaviors: [transition({ name: 'fade' })]
 * @callback Behavior.Instance
 * */
export type Transition = (options?: TransitionOptions) => TransitionInstance;
declare const transition: Transition;
export default transition;
