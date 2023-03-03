
import * as pl from "pareto-core-lib"
import * as pw from "pareto-core-raw"
import * as pm from "pareto-core-state"




//unexpected missing extension
//expected directory (any name)
//unexpected extension: '${$.filePath.extension}
//did not expect a directory
//unexpected directory: '${name}'
//expected file instead of directory
//unexpected file: '${fileNameWithExtension}
//expected directory instead of file


import * as api from "../api"

export const $$: api.CanalysePath = ($) => {
    const fileNameWithExtension = `${$.filePath.baseName}${$.filePath.extension[0] === 'not set' ? "" : `.${$.filePath.extension[1]}`}`

    const filePath = $.filePath

    type State =
        | ["error", api.T.PathError]
        | ["processing", {
            currentDirectory: api.T.Directory
        }]

    let state: State = ["processing", {
        currentDirectory: $.definition
    }]

    const pathPatternBuilder = pm.createArrayBuilderFIXME<string>()
    const pathBuilder = pm.createArrayBuilderFIXME<string>()

    $.filePath.directoryPath.forEach(($) => {
        const stepID = $
        switch (state[0]) {
            case 'error':
                pl.cc(state[1], ($) => {

                })
                break
            case 'processing':
                pl.cc(state[1], ($) => {
                    pathBuilder.push(stepID)
                    const processingState = $
                    switch (processingState.currentDirectory.type[0]) {
                        case 'directory dictionary':
                            pl.cc(processingState.currentDirectory.type[1], ($) => {
                                processingState.currentDirectory = $.definition
                                pathPatternBuilder.push("*")
                            })
                            break
                        case 'files dictionary':
                            pl.cc(processingState.currentDirectory.type[1], ($) => {
                                if ($.recursive) {
                                } else {
                                    state = ["error", ["did not expect a directory", null]]
                                }
                            })
                            break
                        case 'type':
                            pl.cc(processingState.currentDirectory.type[1], ($) => {
                                pw.getEntry(
                                    $.nodes,
                                    stepID,
                                    ($) => {
                                        switch ($.type[0]) {
                                            case 'file':
                                                pl.cc($.type[1], ($) => {
                                                    state = ["error", ["expected file instead of directory", null]]
                                                })
                                                break
                                            case 'directory':
                                                pl.cc($.type[1], ($) => {
                                                    pathPatternBuilder.push(stepID)
                                                    processingState.currentDirectory = $
                                                })
                                                break
                                            default: pl.au($.type[0])
                                        }
                                    },
                                    () => {
                                        state = ["error", ["unexpected directory", null]]
                                    }
                                )


                            })
                            break
                        default: pl.au(processingState.currentDirectory.type[0])
                    }

                })
                break
            default: pl.au(state[0])
        }
    })

    //resetting the type of state
    function getState(): State {
        return state
    }
    state = getState()

    switch (state[0]) {
        case 'error':
            return pl.cc(state[1], ($) => {
                return ["error", {
                    error: $,
                    path: pathBuilder.getArray()
                }]
            })
        case 'processing':
            return pl.cc(state[1], ($) => {

                pathBuilder.push(fileNameWithExtension)
                const fullPath = pathBuilder.getArray()
                const ps = $
                switch (ps.currentDirectory.type[0]) {
                    case 'directory dictionary':
                        return pl.cc(ps.currentDirectory.type[1], ($) => {
                            return ["error", {
                                error: ["expected directory (any name)", null],
                                path: fullPath
                            }]
                        })
                    case 'files dictionary':
                        return pl.cc(ps.currentDirectory.type[1], ($) => {
                            if ($.recursive) {
                                pathPatternBuilder.push("**")
                            }
                            const x = $
                            return pl.cc((filePath.extension), ($) => {
                                switch ($[0]) {
                                    case 'not set':
                                        return pl.cc($[1], ($) => {

                                            pathPatternBuilder.push(`*`)
                                            if (x["allow missing extension"]) {
                                                return ["success", { pattern: pathPatternBuilder.getArray() }]
                                            } else {
                                                return ["error", {
                                                    error: ["unexpected missing extension", null],
                                                    path: fullPath
                                                }]
                                            }
                                        })
                                    case 'set':
                                        return pl.cc($[1], ($) => {

                                            pathPatternBuilder.push(`*.${$}`)

                                            return pw.getEntry<null, api.T.AnalysisResult>(
                                                x.extensions,
                                                $,
                                                () => {
                                                    return ["success", {
                                                        pattern: pathPatternBuilder.getArray()
                                                    }]

                                                },
                                                () => {
                                                    return ["error", {
                                                        error: ["unexpected extension", null],
                                                        path: fullPath
                                                    }]

                                                }
                                            )
                                        })
                                    default: return pl.au($[0])
                                }
                            })
                        })
                    case 'type':
                        return pl.cc(ps.currentDirectory.type[1], ($) => {
                            return pw.getEntry(
                                $.nodes,
                                fileNameWithExtension,
                                ($): api.T.AnalysisResult => {
                                    switch ($.type[0]) {
                                        case 'file':
                                            return pl.cc($.type[1], ($) => {
                                                pathPatternBuilder.push(fileNameWithExtension)

                                                return ["success", {
                                                    pattern: pathPatternBuilder.getArray(),
                                                }]
                                            })
                                        case 'directory':
                                            return pl.cc($.type[1], ($): api.T.AnalysisResult => {
                                                return ["error", {
                                                    error: ["expected directory instead of file", null],
                                                    path: fullPath,
                                                }]
                                            })
                                        default: return pl.au($.type[0])
                                    }
                                },
                                (): api.T.AnalysisResult => {
                                    return ["error", {
                                        error: ["unexpected file", null],
                                        path: fullPath,
                                    }]
                                }
                            )
                        })
                    default: return pl.au(ps.currentDirectory.type[0])
                }
            })
        default: return pl.au(state[0])
    }
}