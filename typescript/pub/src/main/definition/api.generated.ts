import * as pt from 'pareto-core-types'

import * as g_common from "glo-pareto-common"
import * as g_this from "./glossary"
import * as g_tostring from "res-pareto-tostring"

export type analysePath = g_this.F.AnalysePath

export type createAnnotatedPathErrorMessageCreator = ($d: {
    readonly 'getArrayAsString': g_tostring.F.GetArrayAsString
}) => g_this.F.CreateAnnotatedPathErrorMessage

export type createPathErrorMessage = g_this.F.CreatePathErrorMessage

export type createPathMessageCreator = ($d: {
    readonly 'getArrayAsString': g_tostring.F.GetArrayAsString
}) => g_this.F.CreatePathMessage

export type API = {
    analysePath: analysePath
    createAnnotatedPathErrorMessageCreator: createAnnotatedPathErrorMessageCreator
    createPathErrorMessage: createPathErrorMessage
    createPathMessageCreator: createPathMessageCreator
}