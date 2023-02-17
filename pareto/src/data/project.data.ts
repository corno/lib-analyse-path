import * as pd from 'pareto-core-data'

import * as mproject from "lib-pareto-typescript-project/dist/submodules/project"

const d = pd.wrapRawDictionary

import { $ as api } from "./api.data"

export const $: mproject.T.Project = {
    'author': "Corno",
    'description': "given a provided directory structure definition, this library analyses a file path, indicates if it conforms to the expected structure, and provides the applicable pattern for that file path. for example: if you provide a definition and a path like 'customers/John/contactinfo.txt', then the provided pattern will be 'customers/*/*.txt ",
    'license': "ISC",

    'dependencies': d({
        "res-pareto-path": {},
        "glo-pareto-common": {},
        "res-pareto-tostring": {},
    }),
    'type': ['library', {
        'main': {
            'definition': api,
        },
        'submodules': d({
        }),
        'executables': d({}),
        'test': {
            'dependencies': d({
                "res-pareto-path": {},
                "res-pareto-tostring": {},
            }),
            'glossary': {
                'functions': d({}),
                'imports': d({}),
                'parameters': d({}),
                'types': d({}),
                'interfaces': d({}),
            },
        }
    }],
}