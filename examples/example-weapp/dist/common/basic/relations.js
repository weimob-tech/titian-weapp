/* eslint-disable @titian-design/check-life-items */ const joinPath = (name)=>`../${name}/index`;
export const convertParentNode = (name, action)=>{
    const path = joinPath(name);
    return {
        relations: {
            [path]: {
                type: 'ancestor',
                linked (target) {
                    if (action) {
                        action.call(this, target, 'linked');
                    }
                },
                linkChanged (target) {
                    if (action) {
                        action.call(this, target, 'linkChanged');
                    }
                },
                unlinked (target) {
                    if (action) {
                        action.call(this, target, 'unlinked');
                    }
                }
            }
        },
        behavior: Behavior({
            methods: {
                setParent (parentInstance) {
                    if (!this.parent && parentInstance) {
                        this.$parent = parentInstance;
                    }
                },
                getParent () {
                    return this.getRelationNodes(path)?.[0] || this.$parent;
                }
            },
            created () {
                Object.defineProperty(this, 'parent', {
                    get () {
                        return this.getParent();
                    }
                });
            }
        })
    };
};
export const convertChildrenNode = (name, action)=>{
    const relations = {};
    if (!Array.isArray(name)) {
        name = [
            name
        ];
    }
    name = name.map((n)=>joinPath(n));
    name.forEach((el)=>{
        relations[el] = {
            type: 'descendant',
            linked (target) {
                if (action) {
                    action.call(this, target, 'linked');
                }
            },
            linkChanged (target) {
                if (action) {
                    action.call(this, target, 'linkChanged');
                }
            },
            unlinked (target) {
                if (action) {
                    action.call(this, target, 'unlinked');
                }
            }
        };
    });
    return {
        relations,
        behavior: Behavior({
            created () {
                Object.defineProperty(this, 'children', {
                    get () {
                        let children = name.map((n)=>this.getRelationNodes(n)).flat(1).filter((n)=>!!n);
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
                attached () {
                    (this.children || []).forEach((child)=>{
                        child?.setParent(this);
                    });
                }
            }
        })
    };
};
