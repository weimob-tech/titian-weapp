import { PropertyToData } from '../common/interface';
export type LoadingProps = {
    /**
     * loading 展示模式
     *
     * @type {string}
     * @default 'circular'
     * @enum ['circular', 'spinner']
     * @example
     * <ti-loading mode="circular" />
     * @since 0.1.0
     * @memberof LoadingProps
     */
    mode: PropertyToData<StringConstructor>;
    /**
     * loading 尺寸
     *
     * @type {number}
     * @default 72
     * @example
     * <ti-loading size="{{100}}" />
     * @since 0.1.0
     * @memberof LoadingProps
     */
    size: PropertyToData<NumberConstructor>;
    /**
     * 加载文字
     *
     * @type {string}
     * @default ''
     * @example
     * <ti-loading text="加载中" />
     * @since 0.1.0
     * @memberof LoadingProps
     */
    text: PropertyToData<StringConstructor>;
    /**
     * 文字和加载图标的排列方式
     *
     * @type {string}
     * @default ''
     * @enum ['vertical', 'horizontal']
     * @example
     * <ti-loading align="horizontal" />
     * @since 0.1.0
     * @memberof LoadingProps
     */
    direction: PropertyToData<StringConstructor>;
    /**
     * 图标颜色
     *
     * @type {string}
     * @default ''
     * @enum ['vertical', 'horizontal']
     * @example
     * <ti-loading align="horizontal" />
     * @since 0.1.0
     * @memberof LoadingProps
     */
    color: PropertyToData<StringConstructor>;
};
