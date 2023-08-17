import BasicComponent from '../common/basic/BasicComponent';
BasicComponent({
    externalClasses: [
        'title-wrap-class',
        'title-class',
        'sub-title-class'
    ],
    properties: {
        title: String,
        subTitle: String,
        mode: {
            type: String,
            value: 'default'
        }
    }
});
