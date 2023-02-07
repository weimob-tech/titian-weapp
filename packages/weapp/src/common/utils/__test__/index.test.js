const { isArrayEqual, isValidDate, padZero, range, isDisabled, filterInvalidData, debounce } = require('../index');

describe('test utils', () => {
  it('should isArrayEqual function do success', () => {
    expect(isArrayEqual([1, 2, 3], [1, 2, 3])).toBe(true);
    expect(isArrayEqual([1, 2, 3], [1, 2, 4])).toBe(false);
    expect(isArrayEqual([1, 2, 3], [1, 2, 3, 4])).toBe(false);
  });

  it('should isValidDate function do success', () => {
    expect(isValidDate(new Date())).toBe(true);
    expect(isValidDate(new Date().getTime())).toBe(true);
    expect(isValidDate(new Date('2020-01-01'))).toBe(true);
    expect(isValidDate(new Date('2020-01-01 00:00:00'))).toBe(true);
    expect(isValidDate(new Date('2020-01-01 00:00:00.000'))).toBe(true);
    expect(isValidDate(new Date('2020-01-01 00:00:00.000Z'))).toBe(true);
    expect(isValidDate(new Date('2020-01-01 00:00:00.000+0800'))).toBe(true);
    expect(isValidDate(new Date('2020-01-01 00:00:00.000+08:00'))).toBe(true);
  });

  it('should padZero function do success', () => {
    expect(padZero(1, 2)).toBe('01');
    expect(padZero('abc', 10)).toBe('0000000abc');
  });

  it('should range function do success', () => {
    expect(range(1, 5, 2)).toEqual(2);
    expect(range(3, 1, 4)).toEqual(3);
  });

  it('should isDisabled function do success', () => {
    expect(isDisabled([])).toBeFalsy();
    expect(isDisabled('')).toBeFalsy();
    expect(isDisabled({ disabled: true })).toBeTruthy();
    expect(isDisabled({ disabled: false })).toBeFalsy();
  });

  it('should filterInvalidData function do success', () => {
    expect(filterInvalidData({ a: 1, b: 2, c: undefined })).toEqual({
      a: 1,
      b: 2
    });
    expect(filterInvalidData({ a: 1, b: 2, c: 3 })).toEqual({
      a: 1,
      b: 2,
      c: 3
    });
  });

  it('should debounce function do success', (done) => {
    const fn = jest.fn();
    const debounceFn = debounce(fn, 100);
    debounceFn();
    debounceFn();
    debounceFn();
    setTimeout(() => {
      expect(fn).toBeCalledTimes(1);
      done();
    }, 400);
    expect(fn).toBeCalledTimes(0);
  });
});
