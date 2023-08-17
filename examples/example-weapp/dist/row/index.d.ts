import { PropertyToData } from '../common/interface';
export type RowProps = {
    /**
     * 栅格间隔
     *
     * @type number
     * @default 0
     * @example
     * <ti-row gutter="{{ 16 }}">
     *  <ti-col span="6">col 6</ti-col>
     *  <ti-col span="6">col 6</ti-col>
     *  <ti-col span="6">col 6</ti-col>
     *  <ti-col span="6">col 6</ti-col>
     * </ti-row>
     * @since 0.1.0
     * @memberof RowProps
     */
    gutter?: PropertyToData<NumberConstructor>;
    /**
     * flex 布局属性
     *
     * @type boolean
     * @default true
     * @example
     * <ti-row flex>
     *  <ti-col span="6">col 6</ti-col>
     *  <ti-col span="6">col 6</ti-col>
     *  <ti-col span="6">col 6</ti-col>
     *  <ti-col span="6">col 6</ti-col>
     * </ti-row>
     * @since 0.1.0
     * @memberof RowProps
     */
    flex?: PropertyToData<BooleanConstructor>;
};
