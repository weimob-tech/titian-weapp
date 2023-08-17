import BasicComponent from '../common/basic/BasicComponent';
const defaultActions = {
    composed: true,
    bubbles: true
};
BasicComponent({
    externalClasses: [
        'ext-popup-class',
        'ext-popup-content-class',
        'ext-popup-mask-class',
        'ext-title-class'
    ],
    properties: {
        visible: Boolean,
        cancelText: {
            type: String,
            value: '取消'
        },
        options: {
            type: Array,
            value: []
        },
        title: String,
        subTitle: String,
        closeOnMask: {
            type: Boolean,
            value: true
        },
        extStyle: String
    },
    methods: {
        onClose () {
            this.setData({
                visible: false
            });
            this.triggerEvent('close', {}, defaultActions);
        },
        onCancel () {
            this.setData({
                visible: false
            });
            this.triggerEvent('cancel', {}, defaultActions);
        },
        onConfirm () {
            this.setData({
                visible: false
            });
            this.triggerEvent('confirm', {}, defaultActions);
        },
        onClick (e) {
            const { options  } = this.data;
            const { row , col  } = e.currentTarget.dataset;
            const columns = options[row];
            let select = null;
            if (Array.isArray(columns)) {
                select = columns[col];
            } else {
                select = options[col];
            }
            if (select && !select.openType) {
                this.triggerEvent('select', {
                    select
                }, defaultActions);
            }
        },
        onGetUserInfo (e) {
            this.triggerEvent('getuserinfo', e.detail, defaultActions);
        },
        onContact (e) {
            this.triggerEvent('contact', e.detail, defaultActions);
        },
        onGetPhoneNumber (e) {
            this.triggerEvent('getphonenumber', e.detail, defaultActions);
        },
        onError (e) {
            this.triggerEvent('error', e.detail, defaultActions);
        },
        onLaunchApp (e) {
            this.triggerEvent('launchapp', e.detail, defaultActions);
        },
        onOpenSetting (e) {
            this.triggerEvent('opensetting', e.detail, defaultActions);
        }
    }
});
