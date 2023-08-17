import BasicComponent from '../common/basic/BasicComponent';
BasicComponent({
    properties: {
        image: {
            type: String,
            value: 'https://cdn2.weimob.com/saas/saas-fe-sirius-orion-node/production/145/searchwithnoresult.png'
        },
        size: {
            type: String,
            value: 'medium' //  `medium` `big`
        },
        title: String,
        subTitle: String,
        extStyle: String,
        useImageSlot: Boolean,
        useTitleSlot: Boolean
    },
    methods: {
        onClick (e) {
            this.triggerEvent('click', e);
        }
    }
});
