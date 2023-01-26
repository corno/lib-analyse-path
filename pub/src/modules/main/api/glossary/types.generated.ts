import * as pt from 'pareto-core-types'

import * as mcommon from "glo-pareto-common"
import * as mpath from "res-pareto-path"

export namespace GAnalysePathData {}
export type GAnalysePathData = {
    readonly 'definition': UDirectory
    readonly 'filePath': mpath.TParsedFilePath
}
export type UAnalysePathData = GAnalysePathData

export namespace GAnalysisResult {
    
    export namespace Osuccess {
        
        export namespace Ppattern {}
        export type Ppattern = pt.Array<string>
    }
    export type Osuccess = {
        readonly 'pattern': Osuccess.Ppattern
    }
}
export type GAnalysisResult = 
    | ['error', UAnnotatedPathError]
    | ['success', GAnalysisResult.Osuccess]
export type UAnalysisResult = GAnalysisResult

export namespace GAnnotatedPathError {}
export type GAnnotatedPathError = {
    readonly 'error': UPathError
    readonly 'path': UPath
}
export type UAnnotatedPathError = GAnnotatedPathError

export namespace GDirectory {
    
    export namespace Ptype {
        
        export namespace Odirectory__dictionary {}
        export type Odirectory__dictionary = {
            readonly 'definition': UDirectory
        }
    }
    export type Ptype = 
        | ['directory dictionary', Ptype.Odirectory__dictionary]
        | ['files dictionary', UFilesDictionary]
        | ['type', UTypeDirectory]
}
export type GDirectory = {
    readonly 'type': GDirectory.Ptype
}
export type UDirectory = GDirectory

export namespace GFilesDictionary {
    
    export namespace Pextensions {}
    export type Pextensions = pt.Dictionary<null>
}
export type GFilesDictionary = {
    readonly 'allow missing extension': boolean
    readonly 'extensions': GFilesDictionary.Pextensions
    readonly 'recursive': boolean
}
export type UFilesDictionary = GFilesDictionary

export namespace GNode {
    
    export namespace Ptype {}
    export type Ptype = 
        | ['directory', UDirectory]
        | ['file', null]
}
export type GNode = {
    readonly 'type': GNode.Ptype
}
export type UNode = GNode

export namespace GPath {}
export type GPath = pt.Array<string>
export type UPath = GPath

export namespace GPathError {}
export type GPathError = 
    | ['did not expect a directory', null]
    | ['expected directory (any name)', null]
    | ['expected directory instead of file', null]
    | ['expected file instead of directory', null]
    | ['unexpected directory', null]
    | ['unexpected extension', null]
    | ['unexpected file', null]
    | ['unexpected missing extension', null]
export type UPathError = GPathError

export namespace GTypeDirectory {
    
    export namespace Pnodes {}
    export type Pnodes = pt.Dictionary<UNode>
}
export type GTypeDirectory = {
    readonly 'nodes': GTypeDirectory.Pnodes
}
export type UTypeDirectory = GTypeDirectory