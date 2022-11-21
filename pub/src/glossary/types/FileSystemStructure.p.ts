import * as pt from "pareto-core-types"

export type TNode = {
    readonly "type":
    | ["file", null]
    | ["directory", TDirectory]
}

export type TTypeDirectory = {
    readonly "nodes": pt.Dictionary<TNode>
}

export type TFilesDictionary = {
    readonly "allow missing extension": boolean
    readonly "extensions": pt.Dictionary<null>
    readonly "recursive": boolean
}

export type TDirectory = {
    readonly "type":
    | ["directory dictionary", {
        readonly "definition": TDirectory
    }]
    | ["files dictionary", TFilesDictionary]
    | ["type", TTypeDirectory]
}
