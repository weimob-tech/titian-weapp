import BasicComponent from '../common/basic/BasicComponent';
import { hexToRGB, RGBToRGBA } from '../common/utils/color';
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
        checked: {
            type: null,
            observer: 'updateChecked'
        },
        defaultChecked: null,
        icon: String,
        extStyle: String,
        color: {
            type: String,
            observer: 'colorChange'
        }
    },
    data: {
        privateChecked: false,
        styles: ''
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
        colorChange (value, oldValue) {
            if (value !== oldValue) {
                if (value) {
                    this.setData({
                        styles: `
            --radio-button-disabled-border-color:${this.formatColor(value, 0.2)};
            --radio-button-disabled-text-color: ${this.formatColor(value, 0.4)};
            --radio-button-checked-bg-color: ${this.formatColor(value, 0.1)};
            --radio-button-checked-text-color: ${this.formatColor(value, 1)};
            --radio-button-checked-border-color:${this.formatColor(value, 0.4)};`
                    });
                }
            }
        },
        updateChecked (newVal, oldVal) {
            // eslint-disable-next-line eqeqeq
            if (newVal != oldVal) {
                this.setData({
                    privateChecked: newVal
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
                    const { disabled , value: parentValue , defaultValue , icon  } = this.parent.data;
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
                    this.setData({
                        disabled: disabled || this.data.disabled,
                        icon: icon ?? this.data.icon,
                        checked,
                        defaultChecked,
                        privateChecked
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
                this.setData({
                    privateChecked: privateChecked1
                });
            });
        },
        handleChange () {
            const { value , privateChecked , checked  } = this.data;
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
                    privateChecked: nextChecked
                });
            }
        },
        formatColor (colorStr, opacity = 1) {
            if (!colorStr) return '';
            let rgba = '';
            if (colorStr.includes('#')) {
                rgba = hexToRGB(colorStr, opacity);
            }
            if (colorStr.includes('rgba')) {
                const reg = /^rgba?\((.+)\)$/g;
                const a = colorStr.replace(reg, (_s, $1)=>$1);
                const [r, g, b] = a.split(',');
                rgba = `rgba(${r}, ${g}, ${b}, ${opacity})`;
            }
            if (colorStr.includes('rgb')) {
                rgba = RGBToRGBA(colorStr, opacity);
            }
            return rgba;
        },
        handleTagClick () {
            const { disabled  } = this.data;
            if (disabled) return;
            this.handleChange();
        }
    }
});
