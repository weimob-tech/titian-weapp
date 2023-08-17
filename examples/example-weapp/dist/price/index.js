import BasicComponent from '../common/basic/BasicComponent';
BasicComponent({
    properties: {
        value: Number,
        label: String,
        prefix: String,
        radix: {
            type: Number,
            value: 2
        },
        suffix: String,
        unit: String,
        extStyle: String
    },
    observers: {
        value: function watch(value) {
            const integerPart = Math.floor(value).toString();
            const fractionPart = this.addPaddingZero(value.toString().split('.')[1] || '');
            this.setData({
                integerPart,
                fractionPart
            });
        }
    },
    data: {
        integerPart: '0',
        fractionPart: '0'
    },
    methods: {
        addPaddingZero: function addPaddingZero(fractionPart) {
            let { radix  } = this.data;
            if (radix < 0) {
                radix = 0;
            }
            if (fractionPart.length < radix) {
                fractionPart += '0'.repeat(radix - fractionPart.length);
            } else if (fractionPart.length > radix) {
                fractionPart = fractionPart.slice(0, radix);
            }
            return fractionPart;
        }
    }
});
