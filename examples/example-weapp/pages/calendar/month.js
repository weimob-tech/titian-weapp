/* eslint-disable no-unused-vars */

const defaultValue = {
  type: 'multiple', // multiple range single
  defaultDate: ['2010-06-10'],
  minDate: new Date(2010, 1, 7).getTime(),
  maxDate: new Date(2011, 10, 7).getTime(),
  color: '#2580FF',
  maxRange: -1,
  allowSameDay: false,
  round: false,
  position: 'bottom',
  maxSize: 3
};
Page({
  /**
   * 页面的初始数据
   */
  data: {
    min1: new Date(2021, 1, 7).getTime(),
    max1: new Date(2022, 10, 7).getTime(),
    df1: new Date(2022, 5, 7).getTime(),
    range: 0,
    ...defaultValue,
    visible: false,
    visibleControlled: false,
    controlledValue: '2010-10-21',
    formatter: (day) => {
      const { month, status } = day;
      if (month === 9) {
        if (day.day === 1) {
          day.topInfo = '劳动节';
        } else if (day.day === 4) {
          day.topInfo = '五四青年节';
        } else if (day.day === 11) {
          day.text = '今天';
        }
      }

      if (status === 'range_start') {
        day.bottomInfo = '入店';
      } else if (status === 'range_end') {
        day.bottomInfo = '离店';
      } else if (status === 'single') {
      } else {
        day.bottomInfo = '';
      }

      return day;
    }
  },
  onClose(e) {
    const { controlled } = e.currentTarget.dataset;
    if (controlled) {
      this.setData({
        visibleControlled: false
      });
      return;
    }
    this.setData({
      visible: false
    });
  },
  onOpen(e) {
    const { controlled } = e.currentTarget.dataset;
    if (controlled) {
      this.setData({
        visibleControlled: true
      });
      return;
    }
    this.setData({
      visible: true
    });
  },
  onConfirm(e) {
    const currentDate = e.detail;
    console.log('当前日历值', currentDate.map((item) => item.fullDateNum).join('-'));
    this.setData({
      visible: false,
      visibleControlled: false
    });
  },
  onError(e) {
    const { date, currentDate, error } = e.detail;
    console.log('报错选中', date.fullDateNum);
    console.log('当前日历值', currentDate.map((item) => item.fullDateNum).join('-'));
    // wx.showLoading
    wx.showToast({
      icon: 'none',
      title: error.message
    });
  },
  onSelect(e) {
    const { date, currentDate } = e.detail;
    if (!date) {
      console.log('初始化日历值:', currentDate.map((item) => item.fullDateNum).join('-'));
      return;
    }
    console.log('当前选中日历值:', currentDate.map((item) => item.fullDateNum).join('-'));
  },
  onTap(e) {
    console.log(e);
    const { key, value } = e.target.dataset;
    this.setData({
      [key]: value
    });
  },
  onRange(e) {
    console.log(e);
    const { range, value } = e.target.dataset;
    const [minDate, maxDate] = value.map((item) => new Date(item).getTime());
    this.setData({
      range,
      minDate,
      maxDate
    });
  },
  onControlledSelect(e) {
    const { date, currentDate } = e.detail;
    const { type, allowSameDay, maxRange, maxSize } = this.data;
    if (!date) {
      console.log('初始化日历值:', currentDate.map((item) => item.fullDateNum).join('-'));
      return;
    }
    console.log('当前选中日历值:', currentDate.map((item) => item.fullDateNum).join('-'));
    if (type === 'single') {
      this.setData({
        controlledValue: `${date.year}-${date.month}-${date.day}`
      });
      return;
    }
    if (type === 'multiple') {
      if (currentDate.some((item) => item.fullDateNum === date.fullDateNum)) {
        this.setData({
          controlledValue: currentDate
            .filter((item) => item.fullDateNum !== date.fullDateNum)
            .map((item) => `${item.year}-${item.month}-${item.day}`)
        });
        return;
      }
      if (currentDate.length >= maxSize) {
        return;
      }
      this.setData({
        controlledValue: [...currentDate, date].map((item) => `${item.year}-${item.month}-${item.day}`)
      });
      return;
    }
    if (currentDate.length === 0) {
      this.setData({
        controlledValue: `${date.year}-${date.month}-${date.day}`
      });
      return;
    }
    if (currentDate.length === 1) {
      const [before] = currentDate;
      if (before.status === 'range_full') {
        this.setData({
          controlledValue: `${date.year}-${date.month}-${date.day}`
        });
        return;
      }
      if (before.fullDateNum > date.fullDateNum) {
        this.setData({
          controlledValue: `${date.year}-${date.month}-${date.day}`
        });
        return;
      }
      if (before.fullDateNum === date.fullDateNum) {
        if (allowSameDay) {
          this.setData({
            controlledValue: [`${date.year}-${date.month}-${date.day}`, `${date.year}-${date.month}-${date.day}`]
          });
          return;
        }
      }
      if (maxRange > 0) {
        if (date.time - before.time > (maxRange - 1) * 24 * 60 * 60 * 1000) {
          const next = new Date(before.time + (maxRange - 1) * 24 * 60 * 60 * 1000);
          const nextDate = {
            year: next.getFullYear(),
            month: next.getMonth() + 1,
            day: next.getDate()
          };
          this.setData({
            controlledValue: [before, nextDate].map((item) => `${item.year}-${item.month}-${item.day}`)
          });
          return;
        }
      }
      this.setData({
        controlledValue: [...currentDate, date].map((item) => `${item.year}-${item.month}-${item.day}`)
      });
      return;
    }
    this.setData({
      controlledValue: `${date.year}-${date.month}-${date.day}`
    });
  }
});
