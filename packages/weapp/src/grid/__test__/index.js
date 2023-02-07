Component({
  methods: {
    itemClick(e) {
      this.triggerEvent('itemClick', e);
    }
  }
});
