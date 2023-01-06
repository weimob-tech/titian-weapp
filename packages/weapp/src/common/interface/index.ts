export type OmitType<T, P> = Pick<T, { [key in keyof T]: T[key] extends P ? never : key }[keyof T]>;

export type Key = string | number | symbol;

export type IAnyObject = { [key: Key]: unknown };

export type IAnyMap = Map<Key, unknown>;

export type PropertyToData<T extends WechatMiniprogram.Component.PropertyType> =
  | T
  | WechatMiniprogram.Component.FullProperty<T>;
