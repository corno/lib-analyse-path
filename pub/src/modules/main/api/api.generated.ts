import * as pt from 'pareto-core-types'

import * as glo from "./types.generated"

import * as mcommon from "glo-pareto-common"
import * as mtostring from "res-pareto-tostring"

export type CanalysePath = glo.FAnalysePath

export type CcreateAnnotatedPathErrorMessageCreator = ($d: {
    readonly 'sf_getArrayAsString': mtostring.FGetArrayAsString
}) => glo.FCreateAnnotatedPathErrorMessage

export type CcreatePathErrorMessage = glo.FCreatePathErrorMessage

export type CcreatePathMessageCreator = ($d: {
    readonly 'sf_getArrayAsString': mtostring.FGetArrayAsString
}) => glo.FCreatePathMessage

export type API = {
    analysePath: CanalysePath
    createAnnotatedPathErrorMessageCreator: CcreateAnnotatedPathErrorMessageCreator
    createPathErrorMessage: CcreatePathErrorMessage
    createPathMessageCreator: CcreatePathMessageCreator
}