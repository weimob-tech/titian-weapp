export var EdgeType;
(function(EdgeType) {
    EdgeType[/** 不可联通的 */ "NonConnectable"] = 'nonConnectableEdges';
    EdgeType[/** 兄弟节点，可切换过去 */ "Switchable"] = 'siblingsEdges';
    EdgeType[/** 可以连通的，未售空 */ "Connectable"] = 'connectableEdges';
    EdgeType[/** 可以连通的，但已售空 */ "ConnectableSoldout"] = 'soldoutEdges';
})(EdgeType || (EdgeType = {}));
let Graph = class Graph {
    init(specs, skus) {
        // sibling edges map
        specs.forEach((spec)=>{
            const optionIds = spec.options.map((x)=>x.optionId);
            optionIds.forEach((optionId)=>{
                this.addVertex(optionId);
                const restIds = optionIds.filter((x)=>x !== optionId);
                restIds.forEach((toVertex)=>{
                    this.addEdge(optionId, toVertex, 'siblingsEdges');
                });
            });
        });
        // connectable edges map
        skus.forEach((sku)=>{
            sku.specOptionIds.forEach((optionId)=>{
                const restIds = sku.specOptionIds.filter((x)=>x !== optionId);
                restIds.forEach((toVertex)=>{
                    this.addEdge(optionId, toVertex, 'connectableEdges');
                    if (sku.stock === 0) {
                        this.addEdge(optionId, toVertex, 'soldoutEdges');
                    }
                });
            });
        });
        // non connectable edges
        [
            ...this.vertexes || []
        ].forEach((vertex)=>{
            const toVertexes = new Set([
                ...this.siblingsEdges.get(vertex) || [],
                ...this.connectableEdges.get(vertex) || [],
                vertex
            ]);
            const nonConn = [
                ...this.vertexes
            ].filter((x)=>!toVertexes.has(x));
            this.nonConnectableEdges.set(vertex, new Set(nonConn));
        });
    }
    addVertex(value) {
        this.vertexes.add(value);
    }
    addEdge(startVertex, toVertex, edgeType) {
        const targetEdgeSetKey = edgeType;
        if (!targetEdgeSetKey) return;
        let edgeSet = this[targetEdgeSetKey].get(startVertex);
        if (!edgeSet) {
            edgeSet = new Set([
                toVertex
            ]);
        } else {
            edgeSet = new Set([
                ...edgeSet,
                toVertex
            ]);
        }
        this[targetEdgeSetKey].set(startVertex, edgeSet);
    }
    constructor(specs, skus){
        this.vertexes = new Set();
        this.connectableEdges = new Map();
        this.soldoutEdges = new Map();
        this.nonConnectableEdges = new Map();
        this.siblingsEdges = new Map();
        this.init(specs, skus);
    }
};
export { Graph as default };
