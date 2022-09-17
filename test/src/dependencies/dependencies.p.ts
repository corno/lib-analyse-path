import * as path from "res-pareto-path"
import { DDependencies } from "../interface"

import * as pub from "../../../pub"

export const dependencies: DDependencies = {
    parseFilePath: path.f_parseFilePath,
    message: pub.messageDependencies,
}