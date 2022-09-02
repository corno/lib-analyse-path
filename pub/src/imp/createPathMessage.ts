import * as p2 from "pareto-core-tostring"

import * as api from "../interface"
export const createPathMessage: api.CreatePathMessage = ($) => {
    return p2.getArrayAsString($, "/")
}