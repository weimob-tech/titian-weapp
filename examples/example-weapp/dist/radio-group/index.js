import BasicComponent from '../common/basic/BasicComponent';
BasicComponent({
    children: [
        'radio',
        'radio-button'
    ],
    properties: {
        labelDisabled: {
            type: Boolean,
            observer: 'updateChildren'
        },
        disabled: {
            type: Boolean,
            observer: 'updateChildren'
        },
        value: {
            type: null,
            observer: 'updateChildren'
        },
        defaultValue: {
            type: null,
            observer: 'updateChildren'
        },
        direction: {
            type: String,
            observer: 'updateChildren'
        },
        shape: {
            type: String,
            observer: 'updateChildren'
        },
        icon: {
            type: String,
            observer: 'updateChildren'
        },
        options: {
            type: Array,
            value: []
        },
        animation: {
            type: Boolean,
            value: true
        },
        extStyle: String
    },
    lifetimes: {
        attached () {
            this.updateChildren();
        },
        ready () {
            this.updateChildren();
        }
    },
    methods: {
        updateChildren () {
            (this.children || []).forEach((child)=>{
                child?.updateDataFromParent();
            });
        }
    }
});
