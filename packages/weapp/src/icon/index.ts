import BasicComponent from '../common/basic/BasicComponent';

BasicComponent({
  options: {
    virtualHost: true
  },
  properties: {
    name: String,
    color: String,
    size: null,
    spin: Boolean,
    rotate: String,
    extStyle: String,
    prefix: String,
    hyphen: {
      type: String,
      value: '-'
    },
    iconStyle: String
  },
  methods: {
    onClick() {
      this.triggerEvent('click');
    }
  }
});
