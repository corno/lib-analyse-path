import * as pt from 'pareto-core-types'

import { T   } from './types.generated'

import * as gcommon from "glo-pareto-common"
import * as gpath from "res-pareto-path"

export type FAnalysePath = ($: T.AnalysePathData,) => T.AnalysisResult

export type FCreateAnnotatedPathErrorMessage = ($: T.AnnotatedPathError,) => gcommon.T.String

export type FCreatePathErrorMessage = ($: T.PathError,) => gcommon.T.String

export type FCreatePathMessage = ($: T.Path,) => gcommon.T.String