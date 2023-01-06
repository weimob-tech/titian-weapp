const namespaceTest = require('../namespace.wxs');
const wxUtils = require('../wxUtils.wxs');

const NAME = '__test__';

describe('namespace test', () => {
  let mock = null;

  beforeAll(() => {
    mock = jest.spyOn(wxUtils, 'toTypeString'); // spy on toTypeString
    mock.mockImplementation((arg) => Object.prototype.toString.call(arg).slice(8, -1));
  });

  afterAll(() => {
    if (mock) {
      mock.mockRestore();
    }
  });

  it('should join success', () => {
    expect(namespaceTest.join(NAME)).toEqual(`${global.PREFIX}-${NAME}`);
  });

  it('should join string mods success', () => {
    expect(namespaceTest.join(NAME, 'string')).toEqual(`${global.PREFIX}-${NAME}-string`);
  });

  it('should join array mods success', () => {
    expect(namespaceTest.join(NAME, ['a', 'b'])).toEqual(
      `${global.PREFIX}-${NAME}-a ${global.PREFIX}-${NAME}-b ${global.PREFIX}-${NAME}`
    );
  });

  it('should join array object mods success', () => {
    expect(namespaceTest.join(NAME, [{ a: true, b: '', c: false }, 'd'])).toEqual(
      `${global.PREFIX}-${NAME}-a ${global.PREFIX}-${NAME}-d ${global.PREFIX}-${NAME}`
    );
  });

  it('should join object mods success', () => {
    expect(namespaceTest.join(NAME, { a: true, b: '', c: false })).toEqual(
      `${global.PREFIX}-${NAME}-a ${global.PREFIX}-${NAME}`
    );
  });

  it('should handle success', () => {
    expect(namespaceTest.handle(NAME)).toEqual('');
  });

  it('should handle array mods success', () => {
    expect(namespaceTest.handle(NAME, ['a'])).toEqual(`${global.PREFIX}-${NAME}-a`);
  });

  it('should handle array object mods success', () => {
    expect(
      namespaceTest.handle(NAME, [
        'a',
        {
          b: true,
          c: false
        }
      ])
    ).toEqual(`${global.PREFIX}-${NAME}-a ${global.PREFIX}-${NAME}-b`);
  });

  it('should handle object mods success', () => {
    expect(
      namespaceTest.handle(NAME, {
        a: true,
        b: '',
        c: false
      })
    ).toEqual(`${global.PREFIX}-${NAME}-a`);
  });
});
