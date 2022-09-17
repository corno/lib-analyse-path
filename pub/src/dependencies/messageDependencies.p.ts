import * as api from "../interface"

import * as tostring from "res-pareto-tostring"

export const messageDependencies: api.DMessageDependencies = {
    getArrayAsString: tostring.f_getArrayAsString
}