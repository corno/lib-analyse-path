import * as pl from "pareto-core-lib"

import * as api from "../../interface"
import { createPathErrorMessage } from "./createPathErrorMessage"
import { createPathMessage } from "./createPathMessage"
export const createAnnotatedPathErrorMessage: api.FCreateAnnotatedPathErrorMessage = ($) => {
    return `${createPathMessage($.path)}: ${createPathErrorMessage($.error)}`
}