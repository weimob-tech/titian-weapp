import BasicComponent from '../common/basic/BasicComponent';
BasicComponent({
    children: 'sidebar-item',
    properties: {
        // 选中项的索引
        activeIndex: {
            type: Number,
            value: 0,
            observer: 'setActive'
        },
        // 根节点样式
        extStyle: String
    },
    data: {},
    observers: {},
    methods: {
        setActive (index) {
            const { children  } = this;
            if (children) {
                children.forEach((child, i)=>{
                    child.toggle(false);
                    if (i === index) {
                        child.toggle(true);
                    }
                });
            }
            // 切换菜单是触发
            this.triggerEvent('change', index);
        },
        onScrollToUpper (e) {
            this.triggerEvent('scrolltoupper', e.detail);
        },
        onScrollToLower (e) {
            this.triggerEvent('scrolltolower', e.detail);
        },
        onScroll (e) {
            this.triggerEvent('scroll', e.detail);
        }
    }
});
