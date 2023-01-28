import * as pr from 'pareto-core-raw'

import {
    null_,
    array,
    string,
    reference,
    boolean,
    nested,
    typeReference,
    dictionary, group, member, taggedUnion, types, _function
} from "lib-pareto-typescript-project/dist/modules/glossary/api/shorthands.p"

import { definitionReference, constructor, algorithm } from "lib-pareto-typescript-project/dist/modules/moduleDefinition/api/shorthands.p"

import * as mmoduleDefinition from "lib-pareto-typescript-project/dist/modules/moduleDefinition"

const d = pr.wrapRawDictionary

export const $: mmoduleDefinition.TModuleDefinition = {
    'glossary': {
        'imports': d({
            "common": "glo-pareto-common",
            "path": "res-pareto-path"
        }),
        'parameters': d({}),
        'templates': d({}),
        'types': types({
            "AnalysePathData": group({
                "definition": member(reference("Directory")),
                "filePath": member(reference("path", "ParsedFilePath")),
            }),
            "AnalysisResult": taggedUnion({
                "error": reference("AnnotatedPathError"),
                "success": group({
                    "pattern": member(array(string()))
                })
            }),
            "AnnotatedPathError": group({
                "error": member(reference("PathError")),
                "path": member(reference("Path"))
            }),
            "Directory": group({
                "type": member(taggedUnion({
                    "directory dictionary": group({
                        "definition": member(reference("Directory"))
                    }),
                    "files dictionary": reference("FilesDictionary"),
                    "type": reference("TypeDirectory")
                }))
            }),
            "FilesDictionary": group({
                "allow missing extension": member(boolean()),
                "extensions": member(dictionary(null_())),
                "recursive": member(boolean()),
            }),
            "Node": group({
                "type": member(taggedUnion({
                    "file": null_(),
                    "directory": reference("Directory")
                }))
            }),
            "Path": array(string()),
            "PathError": taggedUnion({
                "unexpected missing extension": null_(),
                "expected directory (any name)": null_(),
                "unexpected extension": null_(),
                "did not expect a directory": null_(),
                "unexpected directory": null_(),
                "expected file instead of directory": null_(),
                "unexpected file": null_(),
                "expected directory instead of file": null_(),
            }),
            "TypeDirectory": group({
                "nodes": member(dictionary(reference("Node")))
            }),
        }),
        'interfaces': d({
        }),
        'functions': d({
            "AnalysePath": _function(typeReference("AnalysePathData"), typeReference("AnalysisResult")),
            "CreatePathErrorMessage": _function(typeReference("PathError"), typeReference("common", "String")),
            "CreatePathMessage": _function(typeReference("Path"), typeReference("common", "String")),
            "CreateAnnotatedPathErrorMessage": _function(typeReference("AnnotatedPathError"), typeReference("common", "String")),
        }),
    },
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