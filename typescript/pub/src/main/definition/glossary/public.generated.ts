import * as pt from 'pareto-core-types'

import { T } from './types.generated'

import * as g_common from "glo-pareto-common"
import * as g_path from "res-pareto-path"

export namespace I {}

export namespace B {}

export namespace F {
    
    export type AnalysePath = ($: T.AnalysePathData,) => T.AnalysisResult
    
    export type CreateAnnotatedPathErrorMessage = ($: T.AnnotatedPathError,) => g_common.T.String
    
    export type CreatePathErrorMessage = ($: T.PathError,) => g_common.T.String
    
    export type CreatePathMessage = ($: T.Path,) => g_common.T.String
}