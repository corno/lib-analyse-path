import * as pt from 'pareto-core-types'

import * as gglo from "./glossary"

import * as gcommon from "glo-pareto-common"
import * as gtostring from "res-pareto-tostring"

export type CanalysePath = gglo.FAnalysePath

export type CcreateAnnotatedPathErrorMessageCreator = ($d: {
    readonly 'getArrayAsString': gtostring.FGetArrayAsString
}) => gglo.FCreateAnnotatedPathErrorMessage

export type CcreatePathErrorMessage = gglo.FCreatePathErrorMessage

export type CcreatePathMessageCreator = ($d: {
    readonly 'getArrayAsString': gtostring.FGetArrayAsString
}) => gglo.FCreatePathMessage

export type API = {
    analysePath: CanalysePath
    createAnnotatedPathErrorMessageCreator: CcreateAnnotatedPathErrorMessageCreator
    createPathErrorMessage: CcreatePathErrorMessage
    createPathMessageCreator: CcreatePathMessageCreator
}