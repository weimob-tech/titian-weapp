import BasicComponent from '../common/basic/BasicComponent';
BasicComponent({
    properties: {
        span: {
            type: Number,
            value: 0
        },
        offset: {
            type: Number,
            value: 0
        }
    },
    data: {
        gutter: 0
    },
    parent: 'row'
});
