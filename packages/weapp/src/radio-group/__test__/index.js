Component({
  data: {
    defaultValue: '3',
    selectValue: '1'
  },
  methods: {
    onChange(e) {
      this.setData({
        selectValue: e.detail
      });
    }
  }
});
