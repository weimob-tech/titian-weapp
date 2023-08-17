import BasicComponent from '../common/basic/BasicComponent';
BasicComponent({
    properties: {
        title: String,
        square: Boolean,
        border: {
            type: Boolean,
            value: true,
            observer: 'updateChildrenData'
        },
        direction: {
            type: String,
            value: 'column',
            observer: 'updateChildrenData'
        },
        gutter: {
            type: Number,
            value: 0,
            observer: 'updateChildrenData'
        },
        columns: {
            type: Number,
            value: 4,
            observer: 'updateChildrenData'
        }
    },
    children: 'grid-item',
    relationAction (target) {
        if (this.data) {
            target.setData(this.data);
        }
    },
    lifetimes: {
        ready () {
            this.updateChildrenData();
        }
    },
    methods: {
        // 更新子组件的数据
        updateChildrenData () {
            if (this.data) {
                (this.children || []).forEach((child)=>{
                    child.setData(this.data);
                });
            }
        }
    }
});
