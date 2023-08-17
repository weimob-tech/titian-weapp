/* eslint-disable func-names */ import BasicComponent from '../common/basic/BasicComponent';
//
BasicComponent({
    properties: {
        useContainer: {
            type: Boolean,
            value: true
        },
        // 标题
        title: String,
        // 副标题
        subTitle: String,
        useTitleSlot: Boolean,
        useTitle: {
            type: Boolean,
            value: true
        },
        leftText: String,
        leftIcon: String,
        useLeftSlot: Boolean,
        useLeft: {
            type: Boolean,
            value: true
        },
        rightText: String,
        rightIcon: String,
        useRightSlot: Boolean,
        useRight: {
            type: Boolean,
            value: true
        },
        // 根节点样式
        extStyle: String
    },
    externalClasses: [
        'ext-left-class',
        'ext-left-icon-class',
        'ext-title-class',
        'ext-main-title-class',
        'ext-sub-title-class',
        'ext-right-class',
        'ext-right-icon-class'
    ],
    methods: {
        onClickLeft () {
            this.triggerEvent('click', {
                position: 'left'
            });
        },
        onClickRight () {
            this.triggerEvent('click', {
                position: 'right'
            });
        },
        onClickTitle () {
            this.triggerEvent('click', {
                position: 'title'
            });
        },
        onClickSubTitle () {
            this.triggerEvent('click', {
                position: 'sub-title'
            });
        }
    }
});
