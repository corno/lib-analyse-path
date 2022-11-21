import * as pl from "pareto-core-lib"

import * as api from "../../glossary"
import { f_createPathErrorMessage } from "./createPathErrorMessage.p"
import { f_createPathMessage } from "./createPathMessage.p"
export const f_createAnnotatedPathErrorMessage: api.FCreateAnnotatedPathErrorMessage = ($, $d) => {
    return `${f_createPathMessage(
        $.path,
        $d,
    )}: ${f_createPathErrorMessage($.error)}`
}