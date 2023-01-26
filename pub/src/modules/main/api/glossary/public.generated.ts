import * as pt from 'pareto-core-types'

import * as t from './types.generated'

import * as mcommon from "glo-pareto-common"

export type TAnalysePathData = t.UAnalysePathData

export type TAnalysisResult = t.UAnalysisResult

export type TAnnotatedPathError = t.UAnnotatedPathError

export type TDirectory = t.UDirectory

export type TFilesDictionary = t.UFilesDictionary

export type TNode = t.UNode

export type TParsedFilePath = t.UParsedFilePath

export type TPath = t.UPath

export type TPathError = t.UPathError

export type TTypeDirectory = t.UTypeDirectory

export type FAnalysePath = ($: TAnalysePathData,) => TAnalysisResult

export type FCreateAnnotatedPathErrorMessage = ($: TAnnotatedPathError,) => mcommon.TString

export type FCreatePathErrorMessage = ($: TPathError,) => mcommon.TString

export type FCreatePathMessage = ($: TPath,) => mcommon.TString