import * as pd from 'pareto-core-data'

import { algorithm, dependent, sfunction } from "lib-pareto-typescript-project/dist/submodules/project/shorthands"

import * as g_project from "lib-pareto-typescript-project/dist/submodules/project"
const d = pd.d

export const $: g_project.T.ModuleDefinition.api.root<pd.SourceLocation> = {
    'algorithms': d({
        "analysePath": algorithm(sfunction("this", {}, "AnalysePath")),
        "createPathErrorMessage": algorithm(sfunction("this", {}, "CreatePathErrorMessage")),
        "createPathMessage": algorithm(sfunction("this", {}, "CreatePathMessage"), {}, dependent(null, {
            "getArrayAsString": sfunction("tostring", {}, "GetArrayAsString"),
        }, {})),
        "createAnnotatedPathErrorMessage": algorithm(sfunction("this", {}, "CreateAnnotatedPathErrorMessage"), {}, dependent(null, {
            "getArrayAsString": sfunction("tostring", {}, "GetArrayAsString"),
        }, {})),
    }),
}