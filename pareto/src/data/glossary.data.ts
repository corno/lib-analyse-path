import * as pd from 'pareto-core-data'

import {
    array, boolean, data, dictionary, externalTypeReference, group, imp, member, null_, ref, sfunction, string, taggedUnion, type, typeReference
} from "lib-pareto-typescript-project/dist/submodules/glossary/shorthands"

import * as g_glossary from "lib-pareto-typescript-project/dist/submodules/glossary"

const d = pd.d

export const $: g_glossary.T.Glossary<pd.SourceLocation> = {
    'glossary parameters': d({}),
    'imports': d({
        "common": imp(),
        "path": imp(),
    }),
    'root': {
        'namespaces': d({}),
        'types': d({
            "AnalysePathData": type(group({
                "definition": member(ref(typeReference("Directory"))),
                "filePath": member(ref(externalTypeReference("path", "ParsedFilePath"))),
            })),
            "AnalysisResult": type(taggedUnion({
                "error": ref(typeReference("AnnotatedPathError")),
                "success": group({
                    "pattern": member(array(string())),
                }),
            })),
            "AnnotatedPathError": type(group({
                "error": member(ref(typeReference("PathError"))),
                "path": member(ref(typeReference("Path"))),
            })),
            "Directory": type(group({
                "type": member(taggedUnion({
                    "directory dictionary": group({
                        "definition": member(ref(typeReference("Directory"))),
                    }),
                    "files dictionary": ref(typeReference("FilesDictionary")),
                    "type": ref(typeReference("TypeDirectory")),
                })),
            })),
            "FilesDictionary": type(group({
                "allow missing extension": member(boolean()),
                "extensions": member(dictionary(null_())),
                "recursive": member(boolean()),
            })),
            "Node": type(group({
                "type": member(taggedUnion({
                    "file": null_(),
                    "directory": ref(typeReference("Directory")),
                })),
            })),
            "Path": type(array(string())),
            "PathError": type(taggedUnion({
                "unexpected missing extension": null_(),
                "expected directory (any name)": null_(),
                "unexpected extension": null_(),
                "did not expect a directory": null_(),
                "unexpected directory": null_(),
                "expected file instead of directory": null_(),
                "unexpected file": null_(),
                "expected directory instead of file": null_(),
            })),
            "TypeDirectory": type(group({
                "nodes": member(dictionary(ref(typeReference("Node")))),
            })),
        }),
    },
    'asynchronous': {
        'interfaces': d({}),
        'algorithms': d({}),
    },
    'synchronous': {
        'interfaces': d({}),
        'algorithms': d({
            "AnalysePath": sfunction(typeReference("AnalysisResult"), data(typeReference("AnalysePathData"))),
            "CreatePathErrorMessage": sfunction(externalTypeReference("common", "String"), data(typeReference("PathError"))),
            "CreatePathMessage": sfunction(externalTypeReference("common", "String"), data(typeReference("Path"))),
            "CreateAnnotatedPathErrorMessage": sfunction(externalTypeReference("common", "String"), data(typeReference("AnnotatedPathError"))),
        }),
    },

}