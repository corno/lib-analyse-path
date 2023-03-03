import * as pl from "pareto-core-lib"

import * as api from "../api"

export const $$: api.CcreatePathErrorMessage = ($) => {
    switch ($[0]) {
        case 'did not expect a directory':
            return pl.cc($[1], ($) => {
                return `did not expect a directory`
            })
        case 'expected directory (any name)':
            return pl.cc($[1], ($) => {
                return `expected directory (any name)`
            })
        case 'expected directory instead of file':
            return pl.cc($[1], ($) => {
                return `expected directory instead of file`
            })
        case 'expected file instead of directory':
            return pl.cc($[1], ($) => {
                return `expected file instead of directory`
            })
        case 'unexpected directory':
            return pl.cc($[1], ($) => {
                return `unexpected directory`
            })
        case 'unexpected extension':
            return pl.cc($[1], ($) => {
                return `unexpected extension`
            })
        case 'unexpected file':
            return pl.cc($[1], ($) => {
                return `unexpected file`
            })
        case 'unexpected missing extension':
            return pl.cc($[1], ($) => {
                return `unexpected missing extension`
            })
        default: return pl.au($[0])
    }
}