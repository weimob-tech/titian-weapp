function mergeOptionIntoAttrs(option, attr) {
  const afterAttr = {};
  option.forEach((opt) => {
    const attrVal = attr[opt.key];
    if (Array.isArray(opt.list)) {
      opt.list.forEach((o) => {
        if (o.value === attrVal) {
          afterAttr[opt.key] = o.value;

          if (o.property) {
            Object.assign(afterAttr, o.property);
          } else if (o.attr) {
            Object.assign(afterAttr, o.attr);
          } else {
            afterAttr[opt.key] = o.value;
          }
        }
      });
    } else {
      afterAttr[opt.key] = attr[opt.key];
    }
  });
  return afterAttr;
}

export { mergeOptionIntoAttrs };
