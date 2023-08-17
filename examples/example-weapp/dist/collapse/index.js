import BasicComponent from '../common/basic/BasicComponent';
BasicComponent({
    children: 'collapse-item',
    externalClasses: [
        'ext-option-class',
        'ext-option-content-class'
    ],
    properties: {
        // 选中值
        value: null,
        options: {
            type: Array,
            value: []
        },
        // 左侧图标
        icon: String,
        // 右侧图标
        rightIcon: String,
        // 是否禁用单元格
        disabled: Boolean,
        divider: null,
        clickable: {
            type: Boolean,
            value: false
        },
        /** 是否互斥 */ repel: Boolean,
        extOptionStyle: String
    },
    lifetimes: {
        attached () {
            this.updateChildren();
        }
    },
    observers: {
        'value,repel': function fn(value, repel) {
            if (this.value !== value || this.repel !== repel) {
                this.value = value;
                this.repel = repel;
                let select;
                if (repel) {
                    select = Array.isArray(value) ? value[0] : value;
                } else {
                    select = Array.isArray(value) ? value : [
                        value
                    ];
                }
                if (select !== undefined && select !== null) {
                    this.selectValue = select;
                }
                this.updateChildren();
            }
        }
    },
    methods: {
        updateChildren () {
            (this.children || []).forEach((child)=>{
                child?.updateDataFromParent();
            });
        },
        /**
     * @param name 操作项
     * @param status true: 展开，false: 收起
     */ switch (name, status) {
            const { repel  } = this.data;
            const actionItem = name;
            let value = '';
            if (repel) {
                value = status ? name : '';
            } else if (status) {
                value = [
                    ...this.selectValue || [],
                    name
                ];
            } else {
                value = this.selectValue.filter((activeName)=>activeName !== name);
            }
            this.selectValue = value;
            this.updateChildren();
            if (status) {
                this.triggerEvent('open', actionItem);
            } else {
                this.triggerEvent('close', actionItem);
            }
            this.triggerEvent('change', value);
        }
    }
});
