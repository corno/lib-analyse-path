import * as pr from 'pareto-core-raw'
import {
    null_,
    array,
    externalReference as er,
    string as str,
    reference as ref,
    boolean as bln,
    number as nr,
    nested,
    externalTypeReference,
    typeReference,
    optional,
} from "lib-pareto-typescript-project/dist/modules/glossary/api/shorthands.p"
import { dictionary, group, member, taggedUnion, types, _function } from "lib-pareto-typescript-project/dist/modules/glossary/api/shorthands.p"


import { definitionReference, externalDefinitionReference, constructor } from "lib-pareto-typescript-project/dist/modules/moduleDefinition/api/shorthands.p"
import * as mmoduleDefinition from "lib-pareto-typescript-project/dist/modules/moduleDefinition"

const d = pr.wrapRawDictionary

export const $: mmoduleDefinition.TModuleDefinition = {
    'glossary': {
        'imports': d({
            "common": "glo-pareto-common",
            "path": "res-pareto-path"
        }),
        'parameters': d({}),
        'types': types({
            "AnalysePathData": group({
                "definition": member(ref("Directory")),
                "filePath": member(er("path", "ParsedFilePath")),
            }),
            "AnalysisResult": taggedUnion({
                "error": ref("AnnotatedPathError"),
                "success": group({
                    "pattern": member(array(str()))
                })
            }),
            "AnnotatedPathError": group({
                "error": member(ref("PathError")),
                "path": member(ref("Path"))
            }),

            "Directory": group({
                "type": member(taggedUnion({
                    "directory dictionary": group({
                        "definition": member(ref("Directory"))
                    }),
                    "files dictionary": ref("FilesDictionary"),
                    "type": ref("TypeDirectory")

                }))
            }),
            "FilesDictionary": group({
                "allow missing extension": member(bln()),
                "extensions": member(dictionary(null_())),
                "recursive": member(bln()),
            }),
            "Node": group({
                "type": member(taggedUnion({
                    "file": null_(),
                    "directory": ref("Directory")
                }))
            }),
            // "ParsedFilePath": group({
            //     "directoryPath": member(ref("Path")),
            //     "baseName": member(str()),
            //     "extension": member(optional(str()))
            // }),
            "Path": array(str()),

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
                "nodes": member(dictionary(ref("Node")))
            }),
        }),
        'interfaces': d({
        }),
        'functions': d({
            "AnalysePath": _function(typeReference("AnalysePathData"), typeReference("AnalysisResult")),
            "CreatePathErrorMessage": _function(typeReference("PathError"), externalTypeReference("common", "String")),
            "CreatePathMessage": _function(typeReference("Path"), externalTypeReference("common", "String")),
            "CreateAnnotatedPathErrorMessage": _function(typeReference("AnnotatedPathError"), externalTypeReference("common", "String")),
        }),
    },
    'api': {
        'imports': d({
            "common": "glo-pareto-common",
            "tostring": "res-pareto-tostring",
        }),
        'algorithms': d({

            "analysePath": {
                'definition': {
                    'function': "AnalysePath",
                },
                'type': ['reference', null],
            },
            "createPathErrorMessage": {
                'definition': {
                    'function': "CreatePathErrorMessage",
                },
                'type': ['reference', null],
            },
            "createPathMessageCreator": {
                'definition': {
                    'function': "CreatePathMessage",
                },
                'type': ['constructor', {
                    'configuration data': null,
                    'dependencies': d({
                        "getArrayAsString": {
                            'context': ['import', "tostring"],
                            'function': "GetArrayAsString"
                        }

                    }),
                }],
            },
            "createAnnotatedPathErrorMessageCreator": {
                'definition': definitionReference("CreateAnnotatedPathErrorMessage"),
                'type': constructor(null, {
                    "getArrayAsString": externalDefinitionReference("tostring", "GetArrayAsString")
                }),
            },
        })
    },
}