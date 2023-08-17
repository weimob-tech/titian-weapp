export interface Spec {
    label: string;
    specId: string;
    options: Array<SpecOption>;
}
export interface SpecOption {
    optionId: string;
    label: string;
}
export interface Sku {
    skuId: string;
    specOptionIds: string[];
    stock: number;
}
export declare enum EdgeType {
    /** 不可联通的 */
    NonConnectable = "nonConnectableEdges",
    /** 兄弟节点，可切换过去 */
    Switchable = "siblingsEdges",
    /** 可以连通的，未售空 */
    Connectable = "connectableEdges",
    /** 可以连通的，但已售空 */
    ConnectableSoldout = "soldoutEdges"
}
export default class Graph {
    vertexes: Set<string>;
    connectableEdges: Map<string, Set<string>>;
    nonConnectableEdges: Map<string, Set<string>>;
    soldoutEdges: Map<string, Set<string>>;
    siblingsEdges: Map<string, Set<string>>;
    constructor(specs: Array<Spec>, skus: Array<Sku>);
    init(specs: Array<Spec>, skus: Array<Sku>): void;
    addVertex(value: string): void;
    addEdge(startVertex: string, toVertex: string, edgeType: EdgeType): void;
}
