
import * as tostring from "res-pareto-tostring"

import * as path from "res-pareto-path"

export const dependencies = {
    parseFilePath: path.f_parseFilePath,
    message: {
        getArrayAsString: tostring.f_getArrayAsString
    },
}