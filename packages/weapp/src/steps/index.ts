import BasicComponent from '../common/basic/BasicComponent';

BasicComponent({
  properties: {
    extStyle: String,
    options: Array,
    current: {
      type: Number,
      optionalTypes: [Array],
      value: 0
    },
    activeColor: String,
    icon: String,

    // 取值 left、right
    subtitleAlign: {
      type: String,
      value: 'left'
    },
    alias: {
      type: Object,
      value: {}
    }
  }
});
