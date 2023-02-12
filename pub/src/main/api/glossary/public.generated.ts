import * as pt from 'pareto-core-types'

import { T   } from './types.generated'

import * as mcommon from "glo-pareto-common"
import * as mpath from "res-pareto-path"

export type FAnalysePath = ($: T.AnalysePathData,) => T.AnalysisResult

export type FCreateAnnotatedPathErrorMessage = ($: T.AnnotatedPathError,) => mcommon.T.String

export type FCreatePathErrorMessage = ($: T.PathError,) => mcommon.T.String

export type FCreatePathMessage = ($: T.Path,) => mcommon.T.String