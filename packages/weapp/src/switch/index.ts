import BasicComponent from '../common/basic/BasicComponent';

BasicComponent({
  properties: {
    loading: Boolean,
    value: {
      type: null,
      observer(nextProps) {
        if (typeof nextProps === 'boolean') {
          this.setData({
            curValue: nextProps
          });
        }
      }
    },
    defaultValue: {
      type: Boolean,
      value: true
    },
    size: {
      type: Number,
      value: 40
    },
    disabled: Boolean,
    activeColor: String,
    color: String,
    extStyle: String
  },
  data: {
    curValue: true
  },
  lifetimes: {
    attached() {
      const { value, defaultValue } = this.data;
      if (typeof value === 'boolean') {
        this.setData({
          curValue: value
        });
        return;
      }
      this.setData({
        curValue: defaultValue
      });
    }
  },
  methods: {
    change(e: { value: boolean }) {
      this.triggerEvent('change', e.value);
    }
  }
});
