import BasicComponent from '../common/basic/BasicComponent';
import { nextTick } from '../common/utils/index';
BasicComponent({
    parent: 'checkbox-group',
    relationAction () {
        this.updateDataFromParent();
    },
    properties: {
        label: String,
        value: null,
        disabled: Boolean,
        labelDisabled: Boolean,
        checked: {
            type: null,
            observer: 'updateChecked'
        },
        defaultChecked: null,
        icon: {
            type: String,
            optionalTypes: [
                String,
                Boolean
            ],
            value: ''
        },
        color: String,
        size: {
            type: Number,
            value: 32
        },
        shape: {
            type: String,
            value: 'circle'
        },
        animation: {
            type: Boolean,
            value: true
        },
        iconColor: String,
        extStyle: String
    },
    data: {
        toggleClass: '',
        direction: 'horizontal',
        privateChecked: false
    },
    lifetimes: {
        attached () {
            this.updateDataFromParent();
        }
    },
    methods: {
        updateChecked (newVal, oldVal) {
            // eslint-disable-next-line eqeqeq
            if (newVal != oldVal) {
                this.setData({
                    privateChecked: newVal,
                    toggleClass: newVal ? 'zoom-in' : 'zoom-out'
                });
            }
        },
        updateDataFromParent () {
            if (this.doUpdating) {
                return;
            }
            this.doUpdating = true;
            nextTick(()=>{
                this.doUpdating = false;
                if (this.parent) {
                    const { disabled , value: parentValue , defaultValue: parentDefaultValue , shape , icon , labelDisabled , direction , size , color , animation  } = this.parent.data;
                    const { value  } = this.data;
                    let privateChecked = false;
                    let checked = null;
                    let defaultChecked = null;
                    if (parentValue !== null) {
                        checked = parentValue.includes(value);
                    }
                    if (parentDefaultValue !== null) {
                        defaultChecked = parentDefaultValue.includes(value);
                    }
                    if (defaultChecked !== null) {
                        privateChecked = defaultChecked;
                    }
                    if (checked !== null) {
                        privateChecked = checked;
                    }
                    let toggleClass = '';
                    if (privateChecked) {
                        toggleClass = 'zoom-in';
                    } else if (this.firstRender) {
                        toggleClass = 'zoom-out';
                    }
                    this.setData({
                        labelDisabled: labelDisabled || this.data.labelDisabled,
                        direction: direction ?? this.data.direction,
                        disabled: disabled || this.data.disabled,
                        checked,
                        defaultChecked,
                        privateChecked,
                        color: color ?? this.data.color,
                        shape: shape ?? this.data.shape,
                        icon: icon ?? this.data.icon,
                        size: size ?? this.data.size,
                        animation: animation && this.data.animation,
                        toggleClass
                    });
                    return;
                }
                let checked1 = false;
                if (this.data.defaultChecked !== null) {
                    checked1 = this.data.defaultChecked;
                }
                if (this.data.checked !== null) {
                    checked1 = this.data.checked;
                }
                let toggleClass1 = '';
                if (checked1) {
                    toggleClass1 = 'zoom-in';
                } else if (this.firstRender) {
                    toggleClass1 = 'zoom-out';
                }
                this.setData({
                    privateChecked: checked1,
                    toggleClass: toggleClass1
                });
            });
        },
        handleChange () {
            const { value , privateChecked , checked  } = this.data;
            this.firstRender = true;
            const instance = this.parent || this;
            if (this.parent) {
                const { max  } = this.parent.data;
                let { defaultValue  } = this.parent.data;
                const { value: pValue  } = this.parent.data;
                defaultValue = defaultValue || pValue || [];
                // 当前点击时，原先的值仍然为上一次的选中值
                let newValue = privateChecked ? defaultValue.filter((item)=>item !== value) : [
                    ...defaultValue,
                    value
                ];
                newValue = Array.from(new Set(newValue));
                if (newValue.length > max && checked === null) {
                    this.parent.triggerEvent('handleMax');
                    return;
                }
                this.parent.triggerEvent('change', Array.from(new Set(newValue)));
                if (checked === null) {
                    instance?.setData({
                        defaultValue: newValue
                    });
                }
            } else {
                const nextChecked = !privateChecked;
                this.triggerEvent('change', nextChecked);
                if (checked === null) {
                    this.setData({
                        privateChecked: nextChecked,
                        toggleClass: nextChecked ? 'zoom-in' : 'zoom-out'
                    });
                }
            }
        },
        onChange () {
            const { disabled  } = this.data;
            if (disabled) return;
            this.handleChange();
        },
        onClick () {
            const { disabled , labelDisabled  } = this.data;
            if (disabled || labelDisabled) return;
            this.handleChange();
        }
    }
});
