import link from '../behaviors/link';
import BasicComponent from '../common/basic/BasicComponent';
BasicComponent({
    // 可扩展的 class
    externalClasses: [
        'text-class',
        'content-class'
    ],
    behaviors: [
        link
    ],
    parent: 'grid',
    properties: {
        icon: String,
        size: Number,
        color: String,
        text: String,
        customContent: {
            type: Boolean,
            value: false
        }
    },
    data: {
        direction: 'column',
        square: false,
        border: true,
        columns: 4,
        gutter: 0
    },
    methods: {
        onClick (event) {
            this.triggerEvent('click', event);
            if (this.jumpLink) {
                this.jumpLink();
            }
        }
    }
});
