import * as pr from 'pareto-core-raw'

import {
    null_,
    array,
    string,
    reference,
    boolean,
    nested,
    typeReference,
    dictionary, group, member, taggedUnion, types, func, data
} from "lib-pareto-typescript-project/dist/submodules/glossary/shorthands.p"

import { definitionReference, constructor, algorithm } from "lib-pareto-typescript-project/dist/submodules/moduleDefinition/shorthands.p"

import * as mmoduleDefinition from "lib-pareto-typescript-project/dist/submodules/moduleDefinition"

import { $ as glossary } from "./glossary.data"

const d = pr.wrapRawDictionary

export const $: mmoduleDefinition.TModuleDefinition = {
    'glossary': glossary,
    'api': {
        'imports': d({
            "common": "glo-pareto-common",
            "tostring": "res-pareto-tostring",
        }),
        'algorithms': d({
            "analysePath": algorithm(definitionReference("AnalysePath")),
            "createPathErrorMessage": algorithm(definitionReference("CreatePathErrorMessage")),
            "createPathMessageCreator": algorithm(definitionReference("CreatePathMessage"), constructor(null, {
                "getArrayAsString": definitionReference("tostring", "GetArrayAsString")
            })),
            "createAnnotatedPathErrorMessageCreator": algorithm(definitionReference("CreateAnnotatedPathErrorMessage"), constructor(null, {
                "getArrayAsString": definitionReference("tostring", "GetArrayAsString")
            })),
        })
    },
}