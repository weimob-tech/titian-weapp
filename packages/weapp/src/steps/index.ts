import BasicComponent from '../common/basic/BasicComponent';

BasicComponent({
  children: 'step-item',
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
    subtitleAlign: String,
    alias: {
      type: Object,
      value: {}
    }
  }
});
