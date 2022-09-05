import * as pt from "pareto-core-types"


export type TPathError =
    | ["unexpected missing extension", {}]
    | ["expected directory (any name)", {}]
    | ["unexpected extension", {}]
    | ["did not expect a directory", {}]
    | ["unexpected directory", {}]
    | ["expected file instead of directory", {}]
    | ["unexpected file", {}]
    | ["expected directory instead of file", {}]

export type TPath = pt.Array<string>

export type TAnnotatedPathError = {
    readonly "error": TPathError,
    readonly "path": TPath
}

export type TAnalysisResult =
    | ["error", TAnnotatedPathError]
    | ["success", {
     readonly   "pattern": pt.Array<string>
    }]