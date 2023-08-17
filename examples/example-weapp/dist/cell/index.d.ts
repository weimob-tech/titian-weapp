/// <reference types="miniprogram-api-typings" />
import type { PropertyToData } from '../common/interface/index';
export type CellProps = {
    /**
     * 标题
     *
     * @type string
     * @default ''
     * @example
     * <ti-cell title="标题" />
     * @since 0.1.0
     * @memberof CellProps
     * */
    title?: PropertyToData<StringConstructor>;
    /**
     * 副标题，右侧描述信息
     *
     * @type string
     * @default ''
     * @example
     * <ti-cell title="标题" desc="副标题" />
     * @since 0.1.0
     * @memberof CellProps
     * */
    desc?: PropertyToData<StringConstructor>;
    /**
     * 标题下面的内容
     *
     * @type string
     * @default
     * @example
     * <ti-cell title="标题" label="标题下面的内容" />
     * @since 0.1.0
     * @memberof CellProps
     * */
    label?: PropertyToData<StringConstructor>;
    /**
     * 副标题下面的内容
     *
     * @type string
     * @default
     * @example
     * <ti-cell sub-desc="副标题下面的内容" />
     * @since 0.1.0
     * @memberof CellProps
     * */
    subDesc?: PropertyToData<StringConstructor>;
    /**
     * 图标
     *
     * @type string
     * @default ''
     * @example
     * <ti-cell title="标题" icon="icon" />
     * @since 0.1.0
     * @memberof CellProps
     * */
    icon?: PropertyToData<StringConstructor>;
    /**
     * 右侧图标
     *
     * @type string
     * @default ''
     * @example
     * <ti-cell title="标题" right-icon="checked" />
     * @memberof CellProps
     * @since 0.1.0
     * */
    rightIcon?: PropertyToData<StringConstructor>;
    /**
     * 是否禁用单元格
     *
     * @type boolean
     * @default false
     * @example
     * <ti-cell title="标题" disabled />
     * @since 0.1.0
     * @memberof CellProps
     * */
    disabled?: PropertyToData<BooleanConstructor>;
    /**
     * 是否显示右侧箭头
     *
     * @type boolean
     * @default true
     * @example
     * <ti-cell arrow="{{false}}" />
     * @since 0.1.0
     * @memberof CellProps
     * */
    arrow?: PropertyToData<BooleanConstructor>;
    /**
     * 是否必须选择
     *
     * @type boolean
     * @default false
     * @example
     * <ti-cell required />
     * @since 0.1.0
     * @memberof CellProps
     * */
    required?: PropertyToData<BooleanConstructor>;
    /**
     * 是否开启点击反馈
     *
     * @type boolean
     * @default true
     * @example
     * <ti-cell clickable />
     * @since 0.1.0
     * @memberof CellProps
     * */
    clickable?: PropertyToData<BooleanConstructor>;
    /**
     * 内容块的横向排列方式
     *
     * @type string
     * @default center
     * @example
     * <ti-cell alignItems="center" />
     * @since 0.1.0
     * @memberof CellProps
     * */
    alignItems?: PropertyToData<StringConstructor>;
    /**
     * 添加额外的样式
     *
     * @type string
     * @default ''
     * @example
     * <ti-cell extStyle="background-color: red;" />
     * @since 0.1.0
     * @memberof CellProps
     * */
    extStyle?: PropertyToData<StringConstructor>;
    /**
     * 右侧图标的尺寸
     *
     * @type number
     * @default 28
     * @example
     * <ti-cell icon-size="{{ 36 }}" />
     * @memberof CellProps
     * @since 0.1.0
     */
    iconSize: PropertyToData<NumberConstructor>;
    /**
     * 右侧图标的尺寸
     *
     * @type number
     * @default 28
     * @example
     * <ti-cell right-icon-size="{{ 32 }}" />
     * @memberof CellProps
     * @since 0.1.0
     */
    rightIconSize: PropertyToData<NumberConstructor>;
    /**
     * 图标颜色
     *
     * @type string
     * @default
     * @example
     * <ti-cell color="red" />
     * @memberof CellProps
     * @since 0.1.0
     *
     */
    color: PropertyToData<StringConstructor>;
    useSubArrow?: PropertyToData<BooleanConstructor>;
    /**
     * 是否显示分割线
     *
     * @type boolean
     * @default true
     * @example
     * <ti-cell divider="{{ false }}" title="没有分割线" />
     * @memberof CellProps
     * @since 0.1.0
     */
    divider: PropertyToData<BooleanConstructor>;
    /**
     *  title 的宽度
     *
     *  @type string
     *  @default ''
     *  @example
     *  <ti-cell title-width="100rpx" />
     */
    titleWidth: PropertyToData<StringConstructor>;
    direction: PropertyToData<StringConstructor>;
};
export type CellMethods = {
    /**
     * 点击单元格回调的方法
     *
     * @param event WechatMiniprogram.TouchEvent
     * @return
     *
     * @example
     * <ti-cell bind:click="onClick" />
     * @since 0.1.0
     * @memberof CellMethods
     * */
    onClick(e: WechatMiniprogram.TouchEvent): void;
};
