/* eslint-disable no-unused-expressions */
/* eslint-disable no-param-reassign */
Component({
  properties: {
    options: Array,
    center: {
      type: Boolean,
      value: true
    }
  },
  data: {
    colors: [
      { label: 'red', value: '#fa2c19' },
      { label: 'orange', value: '#ffa300' },
      { label: 'green', value: '#07c160' },
      { label: 'blue', value: '#2a6ae9' },
      { label: 'grey', value: '#9e9e9e' }
    ],
    newOption: []
  },
  observers: {},
  lifetimes: {
    attached() {
      const newOption = this.formatOption(this.data.options);
      this.setData({ newOption });
      this.sendEvent();
    }
  },
  methods: {
    onClick(event) {
      const {
        target: {
          dataset: { item, key }
        }
      } = event;
      const target = this.data.newOption.find((el) => el.key === key);
      if (!target) return;
      if (target.value === item.value) {
        this.sendEvent('repeat');
        return;
      }
      target.value = item.value;
      this.sendEvent();
    },
    onChangeRadius(event) {
      const {
        detail: { value },
        target: {
          dataset: { key }
        }
      } = event;
      const target = this.data.newOption.find((el) => el.key === key);
      target.value = value;
      this.sendEvent();
    },
    sendEvent(eventName = 'change') {
      const newOption = this.formatOption(this.data.newOption);
      const attr = newOption.reduce((prev, curr) => {
        if (!curr.show) return prev;
        prev[curr.key] = curr.value;
        if (curr.attr) {
          prev = { ...prev, ...curr.attr };
        }
        if (curr.type === 'radio') {
          const item = curr.list.find((el) => el.value === curr.value);
          if (item && item.attr) {
            prev = { ...prev, ...item.attr };
          }
        }
        return prev;
      }, {});
      this.setData({ newOption });
      this.triggerEvent(eventName, attr);
    },
    formatOption(data) {
      const options = data;
      options.forEach((item) => {
        item.show = true;
      });
      options.forEach((element) => {
        if (element.type === 'color') {
          element.value = element.value || '#fa2c19';
        } else if (element.type === 'radius') {
          element.value = element.value || 0;
        } else if (element.type === 'radio') {
          const target = element.list.find((item, index) => {
            if (item.value === element.value) {
              element.currentIndex = index;
              return true;
            }
            return false;
          });
          if (!target?.hiddenItems) return;
          target.hiddenItems.forEach((it) => {
            const item = options.find((el) => el.key === it);
            // 只有当他自己显示的情况下，才能控制他的hiddenItems
            element.show && item && (item.show = false);
          });
        }
      });
      return options;
    }
  }
});
