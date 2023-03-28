import * as pt from 'pareto-core-types'

import { T } from "./datatypes.generated"

import * as g_common from "glo-pareto-common"
import * as g_path from "res-pareto-path"

export namespace ASYNC {
    
    export namespace I {}
    
    export namespace A {}
}

export namespace SYNC {
    
    export namespace A {
        
        
        export namespace F {
            export type AnalysePath = ($: T.AnalysePathData) => T.AnalysisResult
        }
        
        
        export namespace F {
            export type CreateAnnotatedPathErrorMessage = ($: T.AnnotatedPathError) => g_common.T.String
        }
        
        
        export namespace F {
            export type CreatePathErrorMessage = ($: T.PathError) => g_common.T.String
        }
        
        
        export namespace F {
            export type CreatePathMessage = ($: T.Path) => g_common.T.String
        }
    }
}