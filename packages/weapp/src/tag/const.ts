enum ETagVariant {
  /** 实心 */
  CONTAINED = 'contained',

  /** 填充 */
  FILLED = 'filled',

  /** 描边 */
  OUTLINED = 'outlined'
}

enum ETagSize {
  /** 小 */
  SMALL = 'small',

  /** 中 */
  MEDIUM = 'medium',

  /** 大 */
  BIG = 'big'
}

enum ETagShape {
  /** 圆角胶囊 */
  CAPSULE = 'capsule',

  /** 圆角 */
  ROUND = 'round',

  /** 矩形 */
  RECT = 'rect',

  /** 树叶形 */
  LEAF = 'leaf'
}

export { ETagVariant, ETagSize, ETagShape };
