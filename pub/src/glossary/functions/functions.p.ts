import * as pt from "pareto-core-types"

import * as mtostring from "res-pareto-tostring"

export type TParsedFilePath = {
    readonly "directoryPath": pt.Array<string>
    readonly "baseName": string
    readonly "extension": null | string
}


export type TPathError =
    | ["unexpected missing extension", null]
    | ["expected directory (any name)", null]
    | ["unexpected extension", null]
    | ["did not expect a directory", null]
    | ["unexpected directory", null]
    | ["expected file instead of directory", null]
    | ["unexpected file", null]
    | ["expected directory instead of file", null]

export type TPath = pt.Array<string>

export type TAnnotatedPathError = {
    readonly "error": TPathError,
    readonly "path": TPath
}

export type TAnalysisResult =
    | ["error", TAnnotatedPathError]
    | ["success", {
        readonly "pattern": pt.Array<string>
    }]

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


export type FAnalysePath = (
    $: {
        readonly "definition": TDirectory,
        readonly "filePath": TParsedFilePath
    },
) => TAnalysisResult

export type FCreatePathErrorMessage = ($: TPathError) => string

export type FCreatePathMessage = (
    $: TPath,
    $d: {
        getArrayAsString: mtostring.FGetArrayAsString
    },
) => string

export type FCreateAnnotatedPathErrorMessage = (
    $: TAnnotatedPathError,
    $d: {
        getArrayAsString: mtostring.FGetArrayAsString
    },
) => string