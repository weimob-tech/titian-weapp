import { PropertyToData } from '../common/interface';
export type GridProps = {
    /**
     * 宫格标题
     *
     * @type string
     * @default ''
     * @example
     * <ti-grid title="自定义图标，文字内容">
     *  <ti-grid-item icon="home" text="Grid" />
     *  <ti-grid-item icon="cart" text="购物车" />
     *  <ti-grid-item icon="phone" text="电话" />
     * </ti-grid>
     * @since 0.1.0
     * @memberof GridProps
     */
    title?: PropertyToData<StringConstructor>;
    /**
     * 是否以自适应正方形展示
     *
     * @type boolean
     * @default false
     * @example
     * <ti-grid square />
     * @since 0.1.0
     * @memberof GridProps
     */
    square?: PropertyToData<BooleanConstructor>;
    /**
     * 是否使用外边框
     *
     * @type boolean
     * @default true
     * @example
     * <ti-grid border />
     * @since 0.1.0
     * @memberof GridProps
     */
    border?: PropertyToData<BooleanConstructor>;
    /**
     * 排列方向
     *
     * @type string
     * @default 'column'
     * @enum ['column', 'row']
     * @example
     * <ti-grid direction="row" />
     * @since 0.1.0
     * @memberof GridProps
     */
    direction?: PropertyToData<StringConstructor>;
    /**
     * 宫格之间的间隙宽度
     *
     * @type number
     * @default 0
     * @example
     * <ti-grid gutter="16" />
     * @since 0.1.0
     * @memberof GridProps
     */
    gutter?: PropertyToData<NumberConstructor>;
    /**
     * 宫格的每行展示的个数， 默认为4个
     *
     * @type number
     * @default 4
     * @example
     * <ti-grid col="3" />
     * @since 0.1.0
     * @memberof GridProps
     */
    columns?: PropertyToData<NumberConstructor>;
};
