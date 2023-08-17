import BasicComponent from '../common/basic/BasicComponent';
BasicComponent({
    properties: {
        // 列元素之间的间距
        gutter: {
            type: Number,
            value: 0,
            observer: 'setGutter'
        },
        // 是否启用flex布局，默认为true
        flex: {
            type: Boolean,
            value: true
        }
    },
    children: 'col',
    relationAction (target) {
        const { gutter , flex  } = this.data;
        if (gutter) {
            target.setData({
                gutter,
                flex
            });
        }
    },
    methods: {
        setGutter () {
            const { gutter , flex  } = this.data;
            (this.children || []).forEach((node)=>{
                node.setData({
                    gutter,
                    flex
                });
            });
        }
    }
});
