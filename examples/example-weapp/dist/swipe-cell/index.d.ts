import { PropertyToData } from '../common/interface';
export type SwipeCellProps = {
    /**
     * 左边滑动区域宽度
     *
     * @type {number}
     * @default 0
     * @example
     * <ti-swiper-cell left-width="{{200}}" />
     * @since 0.1.0
     * @memberof SwipeCellProps
     */
    leftWidth?: PropertyToData<NumberConstructor>;
    /**
     * 右边滑动区域宽度
     *
     * @type {number}
     * @default 0
     * @example
     * <ti-swiper-cell right-width="{{200}}" />
     * @since 0.1.0
     * @memberof SwipeCellProps
     */
    rightWidth?: PropertyToData<NumberConstructor>;
    /**
     * 设置可滑动区域划开
     *
     * @type {boolean}
     * @default false
     * @example
     * <ti-swiper-cell visible />
     * @since 0.1.0
     * @memberof SwipeCellProps
     */
    visible?: PropertyToData<BooleanConstructor>;
    /**
     * 禁止滑动
     *
     * @type {boolean}
     * @default false
     * @example
     * <ti-swiper-cell disabled />
     * @since 0.1.0
     * @memberof SwipeCellProps
     */
    disabled?: PropertyToData<BooleanConstructor>;
    /**
     * 是否异步关闭
     *
     * @type {boolean}
     * @default false
     * @example
     * <ti-swiper-cell asyncClose />
     * @since 0.1.0
     * @memberof SwipeCellProps
     */
    asyncClose?: PropertyToData<BooleanConstructor>;
    /**
     * 唯一标识
     *
     * @type {string}
     * @default ''
     * @example
     * <ti-swiper-cell name="cell" />
     * @since 0.1.0
     * @memberof SwipeCellProps
     */
    name?: PropertyToData<StringConstructor>;
};
