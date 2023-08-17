import BasicComponent from '../common/basic/BasicComponent';
BasicComponent({
    externalClasses: [
        'ext-class',
        'tree-select-sidebar',
        'tree-select-container'
    ],
    properties: {
        extStyle: String,
        options: {
            type: Array,
            value: []
        },
        defaultIndex: {
            type: Number,
            value: 0
        },
        activeValue: Array,
        disabledValue: Array,
        height: {
            type: String,
            optionalTypes: [
                Number
            ],
            value: '100%'
        },
        maxCount: {
            type: Number,
            value: Number.MAX_SAFE_INTEGER
        },
        icon: {
            type: String,
            value: 'selected'
        },
        alias: {
            type: Object,
            value: {}
        }
    },
    data: {
        list: [],
        sidebar: []
    },
    observers: {
        'options, alias': function fn(value, alias) {
            if (value.length > 0) {
                const index = this.data.defaultIndex;
                const childrenAlias = alias.children || 'children';
                this.setData({
                    list: this.data.options[index][childrenAlias] || []
                });
            }
        }
    },
    methods: {
        onClick (event) {
            const { index  } = event.currentTarget.dataset;
            const childrenAlias = this.data.alias.children || 'children';
            this.setData({
                list: this.data.options[index][childrenAlias] || [],
                defaultIndex: index
            });
            const item = this.data.options[index];
            this.triggerEvent('change-nav', {
                index,
                item
            });
        },
        onSelect (event) {
            const { index  } = event.currentTarget.dataset;
            const valueAlias = this.data.alias.value || 'value';
            const value = this.data.list[index][valueAlias];
            const { activeValue , disabledValue  } = this.data;
            if (disabledValue.includes(value)) return;
            if (activeValue.includes(value)) {
                activeValue.splice(activeValue.indexOf(value), 1);
            } else {
                if (activeValue.length >= this.data.maxCount) {
                    return;
                }
                activeValue.push(value);
            }
            this.setData({
                activeValue
            });
            const current = {
                ...this.data.list[index],
                isActive: activeValue.includes(value)
            };
            const item = this.data.options[this.data.defaultIndex];
            this.triggerEvent('change-item', {
                activeValue,
                current,
                item
            });
        }
    }
});
