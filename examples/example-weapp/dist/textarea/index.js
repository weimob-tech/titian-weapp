import BasicComponent from '../common/basic/BasicComponent';
BasicComponent({
    externalClasses: [
        'textarea-class'
    ],
    properties: {
        extStyle: String,
        value: String,
        placeholder: String,
        placeholderStyle: String,
        disabled: Boolean,
        maxlength: {
            type: Number,
            value: 140
        },
        autoFocus: Boolean,
        focus: Boolean,
        autoHeight: Boolean,
        fixed: Boolean,
        cursorSpacing: {
            type: Number,
            value: 0
        },
        cursor: Number,
        showConfirmBar: Boolean,
        selectionStart: {
            type: Number,
            value: -1
        },
        selectionEnd: {
            type: Number,
            value: -1
        },
        adjustPosition: {
            type: Boolean,
            value: true
        },
        holdKeyboard: Boolean,
        disableDefaultPadding: {
            type: Boolean,
            value: true
        },
        confirmType: {
            type: String,
            value: ''
        },
        confirmHold: Boolean,
        showCount: {
            type: Boolean,
            value: false
        }
    },
    data: {
        count: 0,
        textareaHeight: 0
    },
    observers: {
        value (value) {
            let count = 0;
            if (value) {
                count = this.data.maxlength > 0 ? Math.min(value.length, this.data.maxlength) : value.length;
            }
            this.setData({
                count
            });
        }
    },
    lifetimes: {
        attached () {}
    },
    methods: {
        onInput (event) {
            const len = event.detail.value.length;
            const count = this.data.maxlength > 0 ? Math.min(len, this.data.maxlength) : len;
            this.setData({
                count
            });
            this.triggerEvent('input', event.detail);
        },
        onFocus (event) {
            this.triggerEvent('focus', event.detail);
        },
        onBlur (event) {
            this.triggerEvent('blur', event.detail);
        },
        onConfirm (event) {
            this.triggerEvent('confirm', event.detail);
        },
        onKeyboardheightchange (event) {
            this.triggerEvent('keyboardheightchange', event.detail);
        },
        onLinechange (event) {
            this.triggerEvent('linechange', event.detail);
        }
    }
});
