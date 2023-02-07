const { getComponent } = require('../../common/test/getComponent');
const { data, getBasic, mockToday } = require('./mock/index');

function dispatch(detail) {
  const { date, currentDate } = detail;
  if (date) {
    delete date.date;
    delete date.time;
  }
  currentDate.forEach((cur) => {
    delete cur.date;
    delete cur.time;
  });
  return { date, currentDate };
}
beforeAll(() => {
  jest.useFakeTimers('modern');
  jest.setSystemTime(new Date(mockToday));
});

describe('test component', () => {
  const defaultValue = ['2022-03-30', '2022-03-31', '2022-04-01'];
  const defaultValueCal = getBasic({ selectData: defaultValue });
  it('change mode', async () => {
    const select = jest.fn();
    const error = jest.fn();
    const comp = getComponent('calendar', {
      mode: 'multiple',
      visible: true,
      defaultValue
    });
    comp.triggerLifeTime('ready');
    comp.addEventListener('select', select);
    comp.addEventListener('error', error);
    await Promise.resolve();
    expect(select).toHaveBeenCalledTimes(1);

    expect(dispatch(select.mock.calls[0][0].detail)).toStrictEqual({
      date: null,
      currentDate: [
        { ...defaultValueCal[0], status: 'multiple_start' },
        { ...defaultValueCal[1], status: 'multiple_middle' },
        { ...defaultValueCal[2], status: 'multiple_end' }
      ]
    });
    select.mockClear();
    await Promise.resolve();
    comp.setData({ mode: 'range' });
    await Promise.resolve();
    expect(select).toHaveBeenCalledTimes(1);
    expect(dispatch(select.mock.calls[0][0].detail)).toStrictEqual({
      date: null,
      currentDate: [
        { ...defaultValueCal[0], status: 'range_start' },
        { ...defaultValueCal[1], status: 'range_end' }
      ]
    });
    select.mockClear();
    await Promise.resolve();

    comp.setData({ mode: 'single' });
    await Promise.resolve();
    expect(select).toHaveBeenCalledTimes(1);
    expect(dispatch(select.mock.calls[0][0].detail)).toStrictEqual({
      date: null,
      currentDate: [{ ...defaultValueCal[0], status: 'single' }]
    });

    const disableComponent = comp.querySelectorAll('.titian-calendar-date')[0];
    disableComponent.dispatchEvent('tap');
    await Promise.resolve();
    expect(error).toHaveBeenCalledTimes(1);
    jest.runAllTimers();
  });

  it('受控', async () => {
    const select = jest.fn();
    const error = jest.fn();
    const comp = getComponent('calendar', {
      visible: true,
      value: '2022-03-30',
      start: 'Thursday'
    });
    comp.triggerLifeTime('ready');
    comp.addEventListener('select', select);
    comp.addEventListener('error', error);
    await Promise.resolve();
    select.mockClear();
    const component = comp
      .querySelectorAll('.titian-calendar-date')
      .find((day) => day.dom.dataset.date === `${defaultValueCal[1].fullDateNum}`);

    component.dispatchEvent('tap');
    await Promise.resolve();
    expect(select).toHaveBeenCalledTimes(1);
    expect(dispatch(select.mock.calls[0][0].detail)).toStrictEqual({
      date: defaultValueCal[1],
      currentDate: [{ ...defaultValueCal[0], status: 'single' }]
    });
    const { date } = select.mock.calls[0][0].detail;
    const format = `${date.year}-${date.month}-${date.day}`;

    select.mockClear();

    comp.setData({
      value: format
    });
    await Promise.resolve();
    expect(select).toHaveBeenCalledTimes(1);
    expect(dispatch(select.mock.calls[0][0].detail)).toStrictEqual({
      date: null,
      currentDate: [{ ...defaultValueCal[1], status: 'single' }]
    });

    comp.triggerLifeTime('detached');
    await Promise.resolve();
  });

  it('结果不在边界中', async () => {
    const select = jest.fn();
    const error = jest.fn();
    const comp = getComponent('calendar', {
      visible: true,
      defalitValue: '2022-03-30',
      minDate: '2021-03-30',
      maxDate: '2021-03-30'
    });
    comp.triggerLifeTime('ready');
    comp.addEventListener('select', select);
    comp.addEventListener('error', error);
    await Promise.resolve();
    expect(select).toHaveBeenCalledTimes(1);
    expect(dispatch(select.mock.calls[0][0].detail)).toStrictEqual({
      date: null,
      currentDate: []
    });
  });
});
describe.each(data)('test component success $label', ({ list, next }) => {
  if (next) {
    return;
  }
  test.each(list)(` $label `, async (item) => {
    if (item.next) {
      return;
    }
    const select = jest.fn();
    const error = jest.fn();

    const comp = getComponent('calendar', item.props);
    comp.triggerLifeTime('ready');

    comp.addEventListener('select', select);
    comp.addEventListener('error', error);

    await Promise.resolve();

    expect(select).toHaveBeenCalledTimes(1);
    const { date: defaultDate, currentDate: defaultCurrentDate } = select.mock.calls[0][0].detail;
    defaultCurrentDate.forEach((cur) => {
      delete cur.date;
      delete cur.time;
    });
    expect({
      date: defaultDate,
      currentDate: defaultCurrentDate
    }).toStrictEqual(item.expect[0]);
    select.mockClear();
    let action = comp
      .querySelectorAll('.titian-calendar-date')
      .filter((day) => item.action[0].some((d) => `${d}` === day.dom.dataset.date));

    action = item.action[0].map((d) => action.find((a) => `${d}` === a.dom.dataset.date));
    action.forEach((day) => {
      item.expect[1].forEach((d) => {
        if (`${d.dayStr}` === day.dom.dataset.date) {
          expect(day.dom.classList.contains('disabled')).toBe(d.disabled);
        }
      });
    });

    await action.reduce(
      (promise, component, index) =>
        promise
          .then(() => {
            let flag = true;
            if (typeof item.validation === 'function') {
              flag = item.validation(comp, component);
            }
            component.dispatchEvent('tap');
            return Promise.resolve(flag);
          })
          .then((flag) => Promise.resolve().then(() => flag))
          .then((flag) => {
            if (flag) {
              const { dataset } = component.dom;
              if (dataset.status !== 'single') {
                expect(select).toHaveBeenCalledTimes(1);
                const { detail } = select.mock.calls[0][0];
                const { date, currentDate } = detail;
                delete date.date;
                delete date.time;
                currentDate.forEach((cur) => {
                  delete cur.date;
                  delete cur.time;
                });
                expect({ date, currentDate }).toStrictEqual(item.expect[1][index].select[0]);
                select.mockClear();
              }
            } else {
              expect(error).toHaveBeenCalledTimes(1);
              error.mockClear();
            }
          }),
      Promise.resolve()
    );

    await action.reduce(
      (promise, component, index) =>
        promise
          .then(() => {
            let flag = true;
            if (typeof item.validation === 'function') {
              flag = item.validation(comp, component);
            }
            component.dispatchEvent('tap');
            return Promise.resolve(flag);
          })
          .then((flag) => Promise.resolve().then(() => flag))
          .then((flag) => {
            if (flag) {
              const { dataset } = component.dom;
              if (dataset.status !== 'single') {
                expect(select).toHaveBeenCalledTimes(1);
                const { detail } = select.mock.calls[0][0];
                const { date, currentDate } = detail;
                delete date.date;
                delete date.time;
                currentDate.forEach((cur) => {
                  delete cur.date;
                  delete cur.time;
                });
                expect({ date, currentDate }).toStrictEqual(item.expect[2][index].select[0]);
                select.mockClear();
              }
            } else {
              expect(error).toHaveBeenCalledTimes(1);
              error.mockClear();
            }
          }),
      Promise.resolve()
    );
  });
});
afterAll(() => {
  jest.useRealTimers();
});
