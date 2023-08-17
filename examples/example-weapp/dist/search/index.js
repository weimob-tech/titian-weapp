import BasicComponent from '../common/basic/BasicComponent';
BasicComponent({
    externalClasses: [
        'search-button-class',
        'input-class',
        'search-inner-class'
    ],
    properties: {
        // 当前输入的值
        value: String,
        // 输入框内容对齐方式，采用居中模式
        center: {
            type: Boolean,
            value: false
        },
        // 输入框为空时占位符
        placeholder: {
            type: String,
            value: ''
        },
        // 获取焦点
        focus: {
            type: Boolean,
            value: false
        },
        // 指定focus时的光标位置
        cursor: {
            type: Number,
            value: -1
        },
        // 设置键盘右下角按钮的文字，仅在type='text'时生效
        confirmType: {
            type: String,
            value: 'search'
        },
        // 键盘弹起时，是否自动上推页面
        adjustPosition: {
            type: Boolean,
            value: true
        },
        // 指定光标与键盘的距离，取 input 距离底部的距离和 cursor-spacing 指定的距离的最小值作为光标与键盘的距离
        cursorSpacing: {
            type: Number,
            value: 0
        },
        // 是否启用清除控件
        clearable: {
            type: Boolean,
            value: true
        },
        // 是否使用组件搜索按钮
        useSearchButton: {
            type: Boolean,
            value: true
        },
        // 是否只读
        readOnly: Boolean,
        // 是否禁用
        disabled: Boolean,
        // 根节点样式
        extStyle: String,
        // 输入框内部左侧按钮，默认搜索图标
        leftIcon: {
            type: String,
            value: 'search'
        },
        animation: {
            type: Boolean,
            value: true
        },
        alwaysShowSearch: Boolean,
        alwaysShowPrefix: Boolean,
        alwaysShowSuffix: Boolean,
        alwaysShowRightIcon: Boolean,
        maxlength: {
            type: Number,
            value: 140
        }
    },
    data: {
        showVirtualPlaceholder: false,
        showSearch: false
    },
    observers: {
        center (newVal) {
            this.setData({
                showVirtualPlaceholder: newVal
            });
        }
    },
    methods: {
        onClickVirtualInput () {
            const data = {
                showVirtualPlaceholder: false,
                focus: true,
                cursor: 0
            };
            if (this.data.value !== '') {
                data.cursor = this.data.value.length;
            }
            this.setData(data);
            this.triggerEvent('click');
        },
        onFocus () {
            this.setData({
                showSearch: true
            });
            // 输入框聚焦时触发
            this.triggerEvent('focus');
        },
        onBlur () {
            const data = {
                showSearch: false,
                showVirtualPlaceholder: false
            };
            if (this.data.center) {
                data.showVirtualPlaceholder = true;
            }
            this.setData(data);
            // 输入框失焦时触发
            this.triggerEvent('blur');
        },
        onClear () {
            // 清除时触发
            this.triggerEvent('clear');
        },
        onSearch () {
            // 确定搜索时触发
            const result = this.currentValue || {};
            if (result.value !== this.data.value) {
                result.value = this.data.value;
                result.cursor = this.data.value.length;
                result.keyCode = '';
            }
            this.triggerEvent('search', result);
        },
        onChange (event) {
            // 输入值变化时触发
            this.currentValue = event.detail;
            this.setData({
                value: event.detail.value
            });
            this.triggerEvent('change', event.detail);
        },
        onClick () {
            this.triggerEvent('click');
            // 和h5组件库统一api,旧的先兼容线上的
            this.triggerEvent('click-input');
        },
        onKeyboardheightchange (event) {
            // 键盘高度发生变化的时候触发此事件，event.detail = {height: height, duration: duration}
            this.triggerEvent('keyboardheightchange', event.detail);
        }
    }
});
