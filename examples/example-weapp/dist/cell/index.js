import link from '../behaviors/link';
import BasicComponent from '../common/basic/BasicComponent';
BasicComponent({
    behaviors: [
        link
    ],
    externalClasses: [
        'hover-class',
        'title-class',
        'title-wrap-class',
        'label-class',
        'desc-class',
        'desc-content-class',
        'sub-desc-class'
    ],
    properties: {
        title: String,
        label: String,
        desc: String,
        subDesc: String,
        icon: String,
        color: String,
        rightIcon: String,
        disabled: Boolean,
        required: Boolean,
        arrow: {
            type: Boolean,
            value: false
        },
        clickable: Boolean,
        alignItems: {
            type: String,
            value: 'center'
        },
        rightIconSize: Number,
        iconSize: Number,
        extStyle: String,
        useSubArrow: Boolean,
        divider: {
            type: Boolean,
            value: true
        },
        direction: {
            type: String,
            value: 'bottom' // top bottom left right all
        },
        titleWidth: String
    },
    methods: {
        onClick (event) {
            if (this.data.disabled) return;
            this.triggerEvent('click', event);
            this.jumpToLink();
        }
    }
});
