import BasicComponent from '../common/basic/BasicComponent';
BasicComponent({
    children: [
        'checkbox',
        'checkbox-button'
    ],
    properties: {
        value: {
            type: null,
            observer: 'observeValue'
        },
        defaultValue: {
            type: null,
            observer: 'observeValue'
        },
        labelDisabled: {
            type: Boolean,
            observer: 'updateChildren'
        },
        disabled: {
            type: Boolean,
            observer: 'updateChildren'
        },
        direction: {
            type: String,
            observer: 'updateChildren'
        },
        shape: {
            type: String,
            observer: 'updateChildren',
            value: 'circle'
        },
        icon: {
            type: String,
            observer: 'updateChildren'
        },
        color: {
            type: String,
            observer: 'updateChildren'
        },
        size: {
            type: Number,
            value: 32,
            observer: 'updateChildren'
        },
        options: {
            type: Array,
            value: []
        },
        max: {
            type: Number,
            value: Infinity,
            observer: 'updateChildren'
        },
        extStyle: String,
        animation: {
            type: Boolean,
            value: true
        }
    },
    lifetimes: {
        attached () {
            this.updateChildren();
        }
    },
    methods: {
        updateChildren () {
            (this.children || []).forEach((child)=>{
                child?.updateDataFromParent();
            });
        },
        observeValue (newVal) {
            const { max  } = this.data;
            if ((max || Infinity) < newVal.length) {
                this.triggerEvent('handleMax');
                return;
            }
            this.updateChildren();
        }
    }
});
