import * as pt from 'pareto-core-types'

import * as glo from "./glossary"

import * as mcommon from "glo-pareto-common"
import * as mtostring from "res-pareto-tostring"

export type CanalysePath = glo.FAnalysePath

export type CcreateAnnotatedPathErrorMessageCreator = ($d: {
    readonly 'getArrayAsString': mtostring.FGetArrayAsString
}) => glo.FCreateAnnotatedPathErrorMessage

export type CcreatePathErrorMessage = glo.FCreatePathErrorMessage

export type CcreatePathMessageCreator = ($d: {
    readonly 'getArrayAsString': mtostring.FGetArrayAsString
}) => glo.FCreatePathMessage

export type API = {
    analysePath: CanalysePath
    createAnnotatedPathErrorMessageCreator: CcreateAnnotatedPathErrorMessageCreator
    createPathErrorMessage: CcreatePathErrorMessage
    createPathMessageCreator: CcreatePathMessageCreator
}