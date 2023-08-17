import BasicComponent from '../common/basic/BasicComponent';
import { debounce } from '../common/utils/index';
var EInputNumberSize;
(function(EInputNumberSize) {
    EInputNumberSize[/** 默认 */ "MEDIUM"] = 'medium';
    EInputNumberSize[/** 大号 */ "BIG"] = 'big';
})(EInputNumberSize || (EInputNumberSize = {}));
var EInputNumberVariant;
(function(EInputNumberVariant) {
    EInputNumberVariant[/** 背景块型 */ "BLOCK"] = 'block';
    EInputNumberVariant[/** 纯净型 */ "PURE"] = 'pure';
    EInputNumberVariant[/** 明亮型 */ "BRIGHT"] = 'bright';
})(EInputNumberVariant || (EInputNumberVariant = {}));
BasicComponent({
    externalClasses: [
        'ext-minus-class',
        'ext-input-class',
        'ext-plus-class'
    ],
    properties: {
        // 数字输入框的尺寸，可选值为 `default` `big`
        size: {
            type: String,
            value: 'medium'
        },
        // 是否添加外边框
        border: Boolean,
        // 数字输入框的风格，可选值为 `pure` `block` `bright`
        variant: {
            type: String,
            value: 'pure'
        },
        // 按钮为圆形
        round: Boolean,
        // 输入框宽度，默认单位为rpx
        inputWidth: Number,
        // 宽度自适应
        autoWidth: Boolean,
        // 输入值
        value: {
            type: null,
            observer (val, oldVal) {
                if (val !== oldVal) {
                    this.setData({
                        preValue: val
                    });
                }
            }
        },
        // 步长
        step: {
            type: Number,
            value: 1
        },
        // 最小值
        min: {
            type: Number,
            value: Number.MIN_SAFE_INTEGER
        },
        // 最大值
        max: {
            type: Number,
            value: Number.MAX_SAFE_INTEGER
        },
        // 是否禁用输入，只能通过按钮操作
        disabledInput: Boolean,
        // 是否开启异步变更，开启后需要手动控制输入值
        asyncChange: {
            type: Boolean,
            value: false
        },
        // #ifdef MP-ALIPAY
        enableNative: Boolean,
        // #endif
        // 是否收起输入框
        thumbnail: {
            type: Boolean,
            value: false
        },
        // 是否禁用
        disabled: Boolean,
        // 根节点样式
        extStyle: String,
        // value值为0，只展示加号
        initOnlyPlus: Boolean,
        // 是否只允许输入整数
        integer: Boolean,
        readOnly: Boolean,
        readOnlyInput: Boolean
    },
    data: {
        iconSize: 24,
        preValue: -1
    },
    observers: {
        'size, variant': function fn(size, variant) {
            let { min  } = this.data;
            const iconSize = size === 'big' ? 28 : 24;
            if (variant === 'bright') {
                min = Math.max(0, min);
            }
            this.setData({
                iconSize,
                min
            });
        }
    },
    lifetimes: {
        attached () {
            this.onInput = debounce(this.inputChange);
        }
    },
    methods: {
        count (e) {
            const { type  } = e.currentTarget.dataset;
            let newValue = +this.data.value;
            newValue = type === 'plus' ? +this.data.value + this.data.step : +this.data.value - this.data.step;
            newValue = parseFloat(newValue.toFixed(10));
            this.onChange(newValue, type);
        },
        inputChange (event) {
            if (event.detail.value === '') return;
            if (!this.data.integer && event.detail.value.indexOf('.') === event.detail.value.length - 1) return;
            const value = this.data.integer ? parseInt(event.detail.value, 10) : +event.detail.value;
            if (value <= this.data.max && value >= this.data.min) {
                this.triggerEvent('change', value);
            }
            // 当绑定值变化时触发的事件
            if (!this.data.asyncChange) {
                this.setData({
                    value
                });
            }
        },
        onChange (value, type) {
            if (this.data.disabled || this.data.readOnly) return;
            const newValue = Math.max(Math.min(this.data.max, value), this.data.min);
            if (value > this.data.max || value < this.data.min) {
                let currentType = type;
                if (!type) {
                    currentType = value > this.data.max ? 'plus' : 'minus';
                }
                this.triggerEvent('overlimit', {
                    type: currentType
                });
            } else if (type) {
                this.triggerEvent(type, value);
            }
            if (newValue !== this.data.preValue) {
                this.triggerEvent('change', newValue);
            }
            if (!this.data.asyncChange || !type) {
                this.setData({
                    value: newValue,
                    preValue: newValue
                });
            } else {
                this.setData({
                    preValue: newValue
                });
            }
        },
        onFocus (event) {
            // 输入框聚焦时触发
            this.triggerEvent('focus', event.detail);
        },
        onBlur (event) {
            const value = +event.detail.value;
            this.onChange(value);
            // 输入框失焦时触发
            this.triggerEvent('blur', {
                ...event.detail,
                value
            });
        },
        onClickThumbnail () {
            if (this.data.disabled || this.data.readOnly) return;
            this.setData({
                thumbnail: false
            });
        },
        onClickInput () {
            this.triggerEvent('click-input');
        }
    }
});
