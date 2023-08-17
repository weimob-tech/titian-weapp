import BasicComponent from '../common/basic/BasicComponent';
BasicComponent({
    properties: {
        goodsData: {
            type: Object
        },
        extStyle: String
    },
    methods: {
        onClick (e) {
            this.triggerEvent('click-image', e);
        }
    }
});
