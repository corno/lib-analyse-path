import * as pt from 'pareto-core-types'

import * as gcommon from "glo-pareto-common"
import * as gthis from "./glossary"
import * as gtostring from "res-pareto-tostring"

export type CanalysePath = gthis.FAnalysePath

export type CcreateAnnotatedPathErrorMessageCreator = ($d: {
    readonly 'getArrayAsString': gtostring.FGetArrayAsString
}) => gthis.FCreateAnnotatedPathErrorMessage

export type CcreatePathErrorMessage = gthis.FCreatePathErrorMessage

export type CcreatePathMessageCreator = ($d: {
    readonly 'getArrayAsString': gtostring.FGetArrayAsString
}) => gthis.FCreatePathMessage

export type API = {
    analysePath: CanalysePath
    createAnnotatedPathErrorMessageCreator: CcreateAnnotatedPathErrorMessageCreator
    createPathErrorMessage: CcreatePathErrorMessage
    createPathMessageCreator: CcreatePathMessageCreator
}