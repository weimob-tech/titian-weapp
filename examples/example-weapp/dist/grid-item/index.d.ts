import { PropertyToData } from '../common/interface';
export type GridItemProps = {
    /**
     * 图标
     *
     * @type string
     * @default ''
     * @example
     * <ti-grid-item icon="home" text="Grid" />
     * @since 0.1.0
     * @memberof GridItemProps
     */
    icon?: PropertyToData<StringConstructor>;
    /**
     * 文字内容
     *
     * @type string
     * @default ''
     * @example
     * <ti-grid-item icon="home" text="Grid" />
     * @since 0.1.0
     * @memberof GridItemProps
     */
    text?: PropertyToData<StringConstructor>;
    /**
     * 文字颜色
     *
     * @type string
     * @default ''
     * @example
     * <ti-grid-item icon="home" text="Grid" color="red" />
     * @since 0.1.0
     * @memberof GridItemProps
     */
    color?: PropertyToData<StringConstructor>;
    /**
     * 图标尺寸
     *
     * @type number
     * @default ''
     * @example
     * <ti-grid-item icon="home" text="Grid" size={{32}} />
     * @since 0.1.0
     * @memberof GridItemProps
     */
    size?: PropertyToData<NumberConstructor>;
    /**
     * 是否自定义内容
     *
     * @type boolean
     * @default false
     * @example
     * <ti-grid-item custom-content />
     * @since 0.1.0
     * @memberof GridItemProps
     */
    customContent?: PropertyToData<BooleanConstructor>;
};
