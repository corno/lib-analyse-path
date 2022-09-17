import * as pub from "../../../../pub"

import * as path from "api-pareto-path"


export type DDependencies = {
    parseFilePath: path.FParseFilePath

    readonly "message": pub.DMessageDependencies
}