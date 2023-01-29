import * as pr from 'pareto-core-raw'

import * as mproject from "lib-pareto-typescript-project/dist/modules/project"

const d = pr.wrapRawDictionary

import { $ as api } from "./api.p"

export const $: mproject.TProject = {
    'name': "lib-analyse-path",

    'author': "Corno",
    'description': "given a provided directory structure definition, this library analyses a file path, indicates if it conforms to the expected structure, and provides the applicable pattern for that file path. for example: if you provide a definition and a path like 'customers/John/contactinfo.txt', then the provided pattern will be 'customers/*/*.txt ",
    'license': "ISC",

    'type': ['library', {}],
    'modules': d({
        "main": {
            'definition': api,

        },
    }),
    'main': "main",
    'pubdependencies': d({
        "res-pareto-path": {},
        "glo-pareto-common": {},
        "res-pareto-tostring": {},
    }),
    'testdependencies': d({
        "res-pareto-path": {},
        "res-pareto-tostring": {},
    }),
}