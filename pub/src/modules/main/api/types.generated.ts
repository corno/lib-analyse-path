import * as pt from 'pareto-core-types'
import * as mcommon from "glo-pareto-common"

export type TAnalysePathData = {
    readonly 'definition': TDirectory
    readonly 'filePath': TParsedFilePath
}

export type TAnalysisResult = 
    | ['error', TAnnotatedPathError]
    | ['success', {
        readonly 'pattern': pt.Array<string>
    }]

export type TAnnotatedPathError = {
    readonly 'error': TPathError
    readonly 'path': TPath
}

export type TDirectory = {
    readonly 'type': 
        | ['directory dictionary', {
            readonly 'definition': TDirectory
        }]
        | ['files dictionary', TFilesDictionary]
        | ['type', TTypeDirectory]
}

export type TFilesDictionary = {
    readonly 'allow missing extension': boolean
    readonly 'extensions': pt.Dictionary<null>
    readonly 'recursive': boolean
}

export type TNode = {
    readonly 'type': 
        | ['directory', TDirectory]
        | ['file', null]
}

export type TParsedFilePath = {
    readonly 'baseName': string
    readonly 'directoryPath': TPath
    readonly 'extension': null | string
}

export type TPath = pt.Array<string>

export type TPathError = 
    | ['did not expect a directory', null]
    | ['expected directory (any name)', null]
    | ['expected directory instead of file', null]
    | ['expected file instead of directory', null]
    | ['unexpected directory', null]
    | ['unexpected extension', null]
    | ['unexpected file', null]
    | ['unexpected missing extension', null]

export type TTypeDirectory = {
    readonly 'nodes': pt.Dictionary<TNode>
}

export type FAnalysePath = ($: TAnalysePathData,) => TAnalysisResult

export type FCreateAnnotatedPathErrorMessage = ($: TAnnotatedPathError,) => mcommon.TString

export type FCreatePathErrorMessage = ($: TPathError,) => mcommon.TString

export type FCreatePathMessage = ($: TPath,) => mcommon.TString