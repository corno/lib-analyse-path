import * as pt from "pareto-core-types"
export type TNode = {
    readonly "type":
    | ["file", null]
    | ["directory", TDirectory]
}

export type TTypeDirectory = {
    readonly "nodesX": pt.Dictionary<TNode>
}

export type TFilesDictionary = {
    readonly "allow missing extension": boolean
    readonly "extensionsX": pt.Array<string>
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
