import * as pt from "pareto-core-types"


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
     readonly   "pattern": pt.Array<string>
    }]