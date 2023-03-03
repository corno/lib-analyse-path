import * as pd from 'pareto-core-data'

import { functionReference, constructor, algorithm, typeReference } from "lib-pareto-typescript-project/dist/submodules/api/shorthands"

import * as gapi from "lib-pareto-typescript-project/dist/submodules/api"
const d = pd.d

export const $: gapi.T.API<pd.SourceLocation> = {
    'algorithms': d({
        "analysePath": algorithm(functionReference("this", {}, "AnalysePath")),
        "createPathErrorMessage": algorithm(functionReference("this", {}, "CreatePathErrorMessage")),
        "createPathMessageCreator": algorithm(functionReference("this", {}, "CreatePathMessage"), constructor(null, {
            "getArrayAsString": functionReference("tostring", {}, "GetArrayAsString")
        })),
        "createAnnotatedPathErrorMessageCreator": algorithm(functionReference("this", {}, "CreateAnnotatedPathErrorMessage"), constructor(null, {
            "getArrayAsString": functionReference("tostring", {}, "GetArrayAsString")
        })),
    })
}