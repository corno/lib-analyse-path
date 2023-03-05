import * as pd from 'pareto-core-data'

import {
    null_,
    array,
    string,
    reference,
    boolean,
    typeReference,
    dictionary, group, member, taggedUnion, types, func, data, type
} from "lib-pareto-typescript-project/dist/submodules/glossary/shorthands"

import * as mglossary from "lib-pareto-typescript-project/dist/submodules/glossary"

const d = pd.d

export const $: mglossary.T.Glossary<string> = {
    'parameters': d({}),
    'types': d({
        "AnalysePathData": type(group({
            "definition": member(reference("Directory")),
            "filePath": member(reference("path", "ParsedFilePath")),
        })),
        "AnalysisResult": type(taggedUnion({
            "error": reference("AnnotatedPathError"),
            "success": group({
                "pattern": member(array(string())),
            }),
        })),
        "AnnotatedPathError": type(group({
            "error": member(reference("PathError")),
            "path": member(reference("Path")),
        })),
        "Directory": type(group({
            "type": member(taggedUnion({
                "directory dictionary": group({
                    "definition": member(reference("Directory")),
                }),
                "files dictionary": reference("FilesDictionary"),
                "type": reference("TypeDirectory"),
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
                "directory": reference("Directory"),
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
            "nodes": member(dictionary(reference("Node"))),
        })),
    }),
    'builders': d({}),
    'interfaces': d({
    }),
    'functions': d({
        "AnalysePath": func(typeReference("AnalysePathData"), null, null, data(typeReference("AnalysisResult"), false)),
        "CreatePathErrorMessage": func(typeReference("PathError"), null, null, data(typeReference("common", "String"), false)),
        "CreatePathMessage": func(typeReference("Path"), null, null, data(typeReference("common", "String"), false)),
        "CreateAnnotatedPathErrorMessage": func(typeReference("AnnotatedPathError"), null, null, data(typeReference("common", "String"), false)),
    }),
}