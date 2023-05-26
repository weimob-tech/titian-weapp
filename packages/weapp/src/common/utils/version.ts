import { getSystemInfoSync } from './index';

function compareVersion(v1: string, v2: string) {
  const v1Copy = v1.split('.');
  const v2Copy = v2.split('.');
  const len = Math.max(v1Copy.length, v2Copy.length);
  while (v1Copy.length < len) {
    v1Copy.push('0');
  }
  while (v2Copy.length < len) {
    v2Copy.push('0');
  }
  let i = 0;
  for (i = 0; i < len; i += 1) {
    const num1 = parseInt(v1Copy[i], 10);
    const num2 = parseInt(v2Copy[i], 10);
    if (num1 > num2) {
      return 1;
    }
    if (num1 < num2) {
      return -1;
    }
  }
  return 0;
}

export function canIUseFormFieldButton(): boolean {
  let result = false;
  // #ifdef MP-WEIXIN
  const system = getSystemInfoSync();
  result = compareVersion(system.SDKVersion, '2.10.3') >= 0;
  // #endif
  return result;
}
