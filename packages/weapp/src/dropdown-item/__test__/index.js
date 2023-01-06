Component({
  data: {
    multiple: false,
    visible: false,
    options: [
      {
        title: '选项1',
        value: '1'
      },
      {
        title: '选项2',
        value: '2'
      }
    ]
  },
  methods: {
    onSubmit(e) {
      this.setData({
        value: e.detail.value
      });
    },
    onChange(e) {
      this.setData({
        changeValue: e.detail.value
      });
    },
    onClose() {
      this.setData({
        visible: false
      });
    },
    onOpen() {
      this.setData({
        visible: true
      });
    }
  }
});
