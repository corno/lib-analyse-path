import * as pl from "pareto-core-lib"

import * as api from "../api"

import { $$ as f_createPathErrorMessage } from "./createPathErrorMessage.p"
import { $$ as f_createPathMessageCreator } from "./createPathMessageCreator.p"

export const $$: api.CcreateAnnotatedPathErrorMessageCreator = ($d) => {
    return ($) => {
        return `${f_createPathMessageCreator(
            $d,
        )(
            $.path,
        )}: ${f_createPathErrorMessage($.error)}`
    }
}