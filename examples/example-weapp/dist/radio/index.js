import BasicComponent from '../common/basic/BasicComponent';
import { nextTick } from '../common/utils/index';
BasicComponent({
    parent: 'radio-group',
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
        iconColor: String
    },
    data: {
        toggleClass: '',
        direction: 'horizontal',
        privateChecked: false
    },
    lifetimes: {
        attached () {
            this.updateDataFromParent();
        },
        ready () {
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
                    const { disabled , value: parentValue , defaultValue , shape , icon , labelDisabled , direction , animation  } = this.parent.data;
                    const { value  } = this.data;
                    let privateChecked = false;
                    let checked = null;
                    let defaultChecked = null;
                    if (parentValue !== null) {
                        checked = parentValue === value;
                    }
                    if (defaultValue !== null) {
                        defaultChecked = defaultValue === value;
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
                        shape: shape ?? this.data.shape,
                        icon: icon || this.data.icon,
                        animation: animation && this.data.animation,
                        checked,
                        defaultChecked,
                        privateChecked,
                        toggleClass
                    });
                    return;
                }
                const { defaultChecked: defaultChecked1 , checked: checked1  } = this.data;
                let privateChecked1 = false;
                if (defaultChecked1 !== null) {
                    privateChecked1 = defaultChecked1;
                }
                if (checked1 !== null) {
                    privateChecked1 = checked1;
                }
                let toggleClass1 = '';
                if (privateChecked1) {
                    toggleClass1 = 'zoom-in';
                } else if (this.firstRender) {
                    toggleClass1 = 'zoom-out';
                }
                this.setData({
                    privateChecked: privateChecked1,
                    toggleClass: toggleClass1
                });
            });
        },
        handleChange () {
            const { value , privateChecked , checked  } = this.data;
            this.firstRender = true;
            const instance = this.parent || this;
            const nextChecked = !privateChecked;
            instance.triggerEvent('change', this.parent ? value : nextChecked);
            if (checked !== null) {
                return;
            }
            if (this.parent) {
                instance?.setData({
                    defaultValue: value
                });
            } else {
                this.setData({
                    privateChecked: nextChecked,
                    toggleClass: nextChecked ? 'zoom-in' : 'zoom-out'
                });
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
