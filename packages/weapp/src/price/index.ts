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
      const integerPart = Math.floor(value);
      const fractionPart = value.toString().split('.')[1] || '00';
      this.setData({
        integerPart,
        fractionPart
      });
    }
  },
  data: {
    integerPart: 0,
    fractionPart: 0
  }
});
