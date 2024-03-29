import * as pt from 'pareto-core-types'

import * as g_common from "glo-pareto-common"
import * as g_this from "./glossary"
import * as g_tostring from "res-pareto-tostring"

export namespace D {
    
    
    export type createAnnotatedPathErrorMessage = {
        readonly 'getArrayAsString': g_tostring.SYNC.A.F.GetArrayAsString
    }
    
    
    export type createPathMessage = {
        readonly 'getArrayAsString': g_tostring.SYNC.A.F.GetArrayAsString
    }
}

export namespace A {
    
    export type analysePath = () => g_this.SYNC.A.F.AnalysePath
    
    export type createAnnotatedPathErrorMessage = ($d: D.createAnnotatedPathErrorMessage, ) => g_this.SYNC.A.F.CreateAnnotatedPathErrorMessage
    
    export type createPathErrorMessage = () => g_this.SYNC.A.F.CreatePathErrorMessage
    
    export type createPathMessage = ($d: D.createPathMessage, ) => g_this.SYNC.A.F.CreatePathMessage
}

export type API = {
    readonly 'analysePath': A.analysePath
    readonly 'createAnnotatedPathErrorMessage': A.createAnnotatedPathErrorMessage
    readonly 'createPathErrorMessage': A.createPathErrorMessage
    readonly 'createPathMessage': A.createPathMessage
}