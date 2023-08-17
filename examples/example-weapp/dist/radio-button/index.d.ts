import { PropertyToData } from '../common/interface';
export type RadioButtonProps = {
    /**
     * 文字内容
     *
     * @type string
     * @default ''
     * @example
     * <ti-radio-button label="文本" />
     * @since 0.1.0
     * @memberOf RadioButtonProps
     */
    label?: PropertyToData<StringConstructor>;
    /**
     * 根据 value 进行比较，判断是否选中
     *
     * @type string
     * @default ''
     * @example
     * <ti-radio-button value="1" />
     * @since 0.1.0
     * @memberOf RadioButtonProps
     */
    value?: PropertyToData<null>;
    /**
     * 指定当前是否选中, 此模式下为控制型组件
     *
     * @type boolean
     * @default false
     * @example
     * <ti-radio-button checked />
     * @since 0.1.0
     * @memberOf RadioButtonProps
     */
    checked?: PropertyToData<null>;
    /**
     * 初始是否选中, 此模式下为非控制型组件
     *
     * @type boolean
     * @default false
     * @example
     * <ti-radio-button defaultChecked />
     * @since 0.1.0
     * @memberOf RadioButtonProps
     */
    defaultChecked?: PropertyToData<null>;
    /**
     * 指定当前是否禁用
     *
     * @type boolean
     * @default false
     * @example
     * <ti-radio-button disabled />
     * @since 0.1.0
     * @memberOf RadioButtonProps
     */
    disabled?: PropertyToData<BooleanConstructor>;
    /**
     * 自定义图标名称
     *
     * @type string
     * @default ''
     * @example
     * <ti-radio-button icon="custom" />
     * @since 0.1.0
     * @memberOf RadioButtonProps
     */
    icon?: PropertyToData<StringConstructor>;
    leftIcon?: PropertyToData<StringConstructor>;
    /**
     * 单选框颜色配置
     *
     * @type string
     * @default ''
     * @example
     * <ti-radio-button color="red" />
     * @since 0.1.0
     * @memberOf RadioButtonProps
     */
    color?: PropertyToData<StringConstructor>;
    extStyle?: PropertyToData<StringConstructor>;
};
