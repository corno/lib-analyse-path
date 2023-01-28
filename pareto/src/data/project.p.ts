import * as pr from 'pareto-core-raw'

import * as mproject from "lib-pareto-typescript-project/dist/modules/project"

const d = pr.wrapRawDictionary

import { $ as api } from "./api.p"

export const $: mproject.TProject = {
    'type': ['library', {}],
    'modules': d({
        "main": {
            'definition': api,

        },
    }),
    'main': "main"
}