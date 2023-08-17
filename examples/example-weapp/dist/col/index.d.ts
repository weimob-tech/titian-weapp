import { PropertyToData } from '../common/interface';
export type ColProps = {
    /**
     * 栅格占位格数，为 0 时相当于 display: none
     *
     * @type number
     * @default 0
     * @example
     * <ti-col span={2} />
     * @since 0.1.0
     * @memberof ColProps
     * */
    span?: PropertyToData<NumberConstructor>;
    /**
     * 栅格左侧的偏移格数
     *
     * @type number
     * @default 0
     * @example
     * <ti-col span={2} offset={1} />
     * @since 0.1.0
     * @memberof ColProps
     * */
    offset?: PropertyToData<NumberConstructor>;
};
