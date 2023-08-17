import BasicComponent from '../common/basic/BasicComponent';
BasicComponent({
    properties: {
        mode: {
            type: String,
            value: 'circular'
        },
        color: {
            type: String
        },
        size: {
            type: Number,
            value: 72
        },
        text: {
            type: String,
            value: ''
        },
        direction: {
            type: String,
            value: '' // css flex direction attr value
        }
    },
    data: {
        circular: Array(5).fill(0),
        spinner: Array(8).fill(0)
    }
});
