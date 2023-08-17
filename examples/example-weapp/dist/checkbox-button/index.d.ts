import { PropertyToData } from '../common/interface';
export type CheckboxButtonProps = {
    /**
     * 文字内容
     *
     * @type string
     * @default false
     * @example
     * <ti-checkbox-button label />
     * @since 0.1.0
     * @memberOf CheckboxButtonProps
     */
    label?: PropertyToData<StringConstructor>;
    /**
     * 根据 value 进行比较，判断是否选中
     *
     * @type string
     * @default ''
     * @example
     * <ti-checkbox-button value="1" />
     * @since 0.1.0
     * @memberOf CheckboxButtonProps
     */
    value?: PropertyToData<null>;
    /**
     * 指定当前是否选中, 此模式下为控制型组件
     *
     * @type boolean
     * @default false
     * @example
     * <ti-checkbox-button checked />
     * @since 0.1.0
     * @memberOf CheckboxButtonProps
     */
    checked?: PropertyToData<null>;
    /**
     * 初始是否选中, 此模式下为非控制型组件
     *
     * @type boolean
     * @default false
     * @example
     * <ti-checkbox-button defaultChecked />
     * @since 0.1.0
     * @memberOf CheckboxButtonProps
     */
    defaultChecked?: PropertyToData<null>;
    /**
     * 指定当前是否禁用
     *
     * @type boolean
     * @default false
     * @example
     * <ti-checkbox-button disabled />
     * @since 0.1.0
     * @memberOf CheckboxButtonProps
     */
    disabled?: PropertyToData<BooleanConstructor>;
    /**
     * 自定义图标名称
     *
     * @type string
     * @default 'checkbox'
     * @example
     * <ti-checkbox-button icon="checkbox" />
     * @since 0.1.0
     * @memberOf CheckboxButtonProps
     */
    icon?: PropertyToData<StringConstructor>;
    leftIcon?: PropertyToData<StringConstructor>;
    /**
     * 单选框颜色配置
     *
     * @type string
     * @default ''
     * @example
     * <ti-checkbox-button color="red" />
     * @since 0.1.0
     * @memberOf CheckboxButtonProps
     */
    color?: PropertyToData<StringConstructor>;
    extStyle?: PropertyToData<StringConstructor>;
};
