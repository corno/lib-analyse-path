import * as pd from 'pareto-core-data'

import * as mproject from "lib-pareto-typescript-project/dist/submodules/project"

const d = pd.d

import { $ as api } from "./api.data"
import { $ as glossary } from "./glossary.data"

import { external, sibling, this_ } from "lib-pareto-typescript-project/dist/submodules/project/shorthands"

export const $: mproject.T.Project<pd.SourceLocation> = {
    'author': "Corno",
    'description': "given a provided directory structure definition, this library analyses a file path, indicates if it conforms to the expected structure, and provides the applicable pattern for that file path. for example: if you provide a definition and a path like 'customers/John/contactinfo.txt', then the provided pattern will be 'customers/*/*.txt ",
    'license': "TBD",

    'dependencies': d({
        "res-pareto-path": null,
        "glo-pareto-common": null,
        "res-pareto-tostring": null,
    }),
    'type': ['library', {
        'main': {
            'definition': {
                'glossary': {
                    'root': glossary,
                    'imports': d({
                        "common": external("glo-pareto-common"),
                        "path": external("res-pareto-path"),
                    }),
                },
                'api': {
                    'root': api,
                    'imports': d({
                        "common": external("glo-pareto-common"),
                        "tostring": external("res-pareto-tostring"),
                        "this": this_(),
                    }),
                }
            },
            'implementation': ['typescript', null],
        },
        'submodules': d({
        }),
        'executables': d({}),
        'test': {
            'dependencies': d({
                "res-pareto-path": null,
                "res-pareto-tostring": null,
            }),
            'glossary': {
                'functions': d({}),
                'parameters': d({}),
                'types': d({}),
                'interfaces': d({}),
            },
            'imports': d({}),
        }
    }],
}