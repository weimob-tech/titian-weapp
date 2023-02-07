/* eslint-disable @titian-design/check-life-items */
const joinPath = (name: string) => `../${name}/index`;
type TrivialInstance = WechatMiniprogram.Component.TrivialInstance;

export const convertParentNode = (
  name: string,
  action?: ((target: WechatMiniprogram.Component.TrivialInstance, type: string) => void) | undefined
) => {
  const path = joinPath(name);

  return {
    relations: {
      [path]: {
        type: 'ancestor',
        linked(target: TrivialInstance) {
          if (action) {
            action.call(this, target, 'linked');
          }
        },
        linkChanged(target: TrivialInstance) {
          if (action) {
            action.call(this, target, 'linkChanged');
          }
        },
        unlinked(target: TrivialInstance) {
          if (action) {
            action.call(this, target, 'unlinked');
          }
        }
      } as WechatMiniprogram.Component.RelationOption
    },
    behavior: Behavior({
      methods: {
        setParent(parentInstance: TrivialInstance) {
          if (!this.parent && parentInstance) {
            (this.$parent as TrivialInstance) = parentInstance;
          }
        },
        getParent() {
          return this.getRelationNodes(path)?.[0] || this.$parent;
        }
      },
      created() {
        Object.defineProperty(this, 'parent', {
          get() {
            return this.getParent();
          }
        });
      }
    })
  };
};

export const convertChildrenNode = (
  name: string | string[],
  action?: ((target: TrivialInstance, type: string) => void) | undefined
) => {
  const relations: Record<string, WechatMiniprogram.Component.RelationOption> = {};

  if (!Array.isArray(name)) {
    name = [name];
  }
  name = name.map((n) => joinPath(n));
  name.forEach((el) => {
    relations[el] = {
      type: 'descendant',
      linked(target: TrivialInstance) {
        if (action) {
          action.call(this, target, 'linked');
        }
      },
      linkChanged(target: TrivialInstance) {
        if (action) {
          action.call(this, target, 'linkChanged');
        }
      },
      unlinked(target: TrivialInstance) {
        if (action) {
          action.call(this, target, 'unlinked');
        }
      }
    };
  });
  return {
    relations,
    behavior: Behavior({
      created() {
        Object.defineProperty(this, 'children', {
          get() {
            let children = (name as string[])
              .map((n) => this.getRelationNodes(n))
              .flat(1)
              .filter((n) => !!n);

            if (!Array.isArray(children) || children.length === 0) {
              children = this.selectAllComponents('.internal_children');
            }

            if (!Array.isArray(children) || children.length === 0) {
              children = [];
            }

            return children;
          }
        });
      },
      lifetimes: {
        attached() {
          ((this.children || []) as Array<TrivialInstance>).forEach((child: TrivialInstance) => {
            child?.setParent(this);
          });
        }
      }
    })
  };
};
