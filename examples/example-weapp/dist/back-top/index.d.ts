import type { TransitionProps } from '../behaviors/transition';
import type { PropertyToData } from '../common/interface/index';
export type BackTopProps = TransitionProps & {
    /**
     * 滚动距顶部指定距离后展示
     *
     * @type number
     * @default
     * @example
     * <ti-back-top visibility-height="100" />
     * @since 0.1.0
     * @memberof BackTopProps
     * */
    visibilityHeight?: PropertyToData<NumberConstructor>;
    /**
     * 展示文字
     *
     * @type string
     * @default
     * @example
     * <ti-back-top text="返回顶部" />
     * @since 0.1.0
     * @memberof BackTopProps
     * */
    text?: PropertyToData<StringConstructor>;
    /**
     * 滚动到顶部时间（ms）
     *
     * @type number
     * @default 300
     * @example
     * <ti-back-top duration="300" />
     * @since 0.1.0
     * @memberof BackTopProps
     * */
    duration?: PropertyToData<NumberConstructor>;
    /**
     * 是否自定义内容
     *
     * @type boolean
     * @default false
     * @example
     * <ti-back-top useSlot><text>回到顶部</text></ti-back-top>
     * @since 0.1.0
     * @memberof BackTopProps
     */
    useSlot?: PropertyToData<BooleanConstructor>;
};
export type BackTopMethods = {
    /**
     * 监听传入的 scrollTop 并控制 back top 是否展示
     *
     * @param {number} scrollTop
     * @returns {void}
     * @private true
     * @since 0.1.0
     * @memberof BackTopMethods
     * */
    changeScrollTop(scrollTop: number): void;
    /**
     * 绑定点击事件并触发返回顶部
     *
     * @private true
     * @returns {void}
     * @example
     * <ti-back-top bind:click="handleClick" />
     * @since 0.1.0
     * @memberof BackTopMethods
     * */
    onClick(): void;
};
