import * as pr from 'pareto-core-raw'

import {
    null_,
    array,
    string,
    reference,
    boolean,
    typeReference,
    dictionary, group, member, taggedUnion, types, func, data
} from "lib-pareto-typescript-project/dist/submodules/glossary/shorthands.p"

import * as mglossary from "lib-pareto-typescript-project/dist/submodules/glossary"

const d = pr.wrapRawDictionary

export const $: mglossary.TGlossary = {
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
        "AnalysePath": func(typeReference("AnalysePathData"), null, null, data(typeReference("AnalysisResult"), false)),
        "CreatePathErrorMessage": func(typeReference("PathError"), null, null, data(typeReference("common", "String"), false)),
        "CreatePathMessage": func(typeReference("Path"), null, null, data(typeReference("common", "String"), false)),
        "CreateAnnotatedPathErrorMessage": func(typeReference("AnnotatedPathError"), null, null, data(typeReference("common", "String"), false)),
    }),
}