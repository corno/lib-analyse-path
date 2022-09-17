import * as pl from "pareto-core-lib"

import * as api from "../../interface"
import { f_createPathErrorMessage } from "./f_createPathErrorMessage"
import { f_createPathMessage } from "./f_createPathMessage"
export const f_createAnnotatedPathErrorMessage: api.FCreateAnnotatedPathErrorMessage = ($) => {
    return `${f_createPathMessage($.path)}: ${f_createPathErrorMessage($.error)}`
}