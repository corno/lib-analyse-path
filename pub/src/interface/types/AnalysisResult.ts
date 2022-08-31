import * as pt from "pareto-core-types"


export type PathError =
    | ["unexpected missing extension", {}]
    | ["expected directory (any name)", {}]
    | ["unexpected extension", {}]
    | ["did not expect a directory", {}]
    | ["unexpected directory", {}]
    | ["expected file instead of directory", {}]
    | ["unexpected file", {}]
    | ["expected directory instead of file", {}]

export type TAnalysisResult =
    | ["error", {
        error: PathError,
        path: null | pt.Array<string>
    }]
    | ["success", {
        pattern: pt.Array<string>
    }]