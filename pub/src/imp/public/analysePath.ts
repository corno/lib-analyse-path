
import * as pl from "pareto-core-lib"
import * as pw from "pareto-core-raw"
import * as pr from "pareto-core-resolve"
import * as pm from "pareto-core-state"




//unexpected missing extension
//expected directory (any name)
//unexpected extension: '${$.filePath.extension}
//did not expect a directory
//unexpected directory: '${name}'
//expected file instead of directory
//unexpected file: '${fileNameWithExtension}
//expected directory instead of file


import * as api from "../../interface"

export const analysePath: api.FAnalysePath = ($) => {
    const fileNameWithExtension = `${$.filePath.baseName}${$.filePath.extension === null ? "" : `.${$.filePath.extension}`}`


    const filePath = $.filePath

    type State =
        | ["error", api.TPathError]
        | ["processing", {
            currentDirectory: api.TDirectory
        }]

    let state: State = ["processing", {
        currentDirectory: $.definition
    }]

    const pathPatternBuilder = pm.createArrayBuilder<string>()
    const pathBuilder = pm.createArrayBuilder<string>()

    $.filePath.directoryPath.forEach(($) => {
        const stepID = $
        switch (state[0]) {
            case "error":
                pl.cc(state[1], ($) => {

                })
                break
            case "processing":
                pl.cc(state[1], ($) => {
                    pathBuilder.push(stepID)
                    const processingState = $
                    switch (processingState.currentDirectory.type[0]) {
                        case "directory dictionary":
                            pl.cc(processingState.currentDirectory.type[1], ($) => {
                                processingState.currentDirectory = $.definition
                                pathPatternBuilder.push("*")
                            })
                            break
                        case "files dictionary":
                            pl.cc(processingState.currentDirectory.type[1], ($) => {
                                if ($.recursive) {
                                } else {
                                    state = ["error", ["did not expect a directory", {}]]
                                }
                            })
                            break
                        case "type":
                            pl.cc(processingState.currentDirectory.type[1], ($) => {
                                pr.getEntry(
                                    $.nodesX,
                                    stepID,
                                    ($) => {
                                        switch ($.type[0]) {
                                            case "file":
                                                pl.cc($.type[1], ($) => {
                                                    state = ["error", ["expected file instead of directory", {}]]
                                                })
                                                break
                                            case "directory":
                                                pl.cc($.type[1], ($) => {
                                                    pathPatternBuilder.push(stepID)
                                                    processingState.currentDirectory = $
                                                })
                                                break
                                            default: pl.au($.type[0])
                                        }
                                    },
                                    () => {
                                        state = ["error", ["unexpected directory", {}]]
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
        case "error":
            return pl.cc(state[1], ($) => {
                return ["error", {
                    error: $,
                    path: pathBuilder.getArray()
                }]
            })
        case "processing":
            return pl.cc(state[1], ($) => {

                pathBuilder.push(fileNameWithExtension)
                const fullPath = pathBuilder.getArray()
                const ps = $
                switch (ps.currentDirectory.type[0]) {
                    case "directory dictionary":
                        return pl.cc(ps.currentDirectory.type[1], ($) => {
                            return ["error", {
                                error: ["expected directory (any name)", {}],
                                path: fullPath
                            }]
                        })
                    case "files dictionary":
                        return pl.cc(ps.currentDirectory.type[1], ($) => {
                            if ($.recursive) {
                                pathPatternBuilder.push("**")
                            }
                            if (filePath.extension === null) {
                                pathPatternBuilder.push(`*`)

                                if ($["allow missing extension"]) {
                                    return ["success", { pattern: pathPatternBuilder.getArray() }]
                                } else {
                                    return ["error", {
                                        error: ["unexpected missing extension", {}],
                                        path: fullPath
                                    }]
                                }
                            } else {
                                pathPatternBuilder.push(`*.${filePath.extension}`)
                                const exts = pm.createDictionaryBuilder<null>(
                                    ["ignore", {}],
                                    () => {
                                        pl.panic("extension not unique")
                                    }
                                )
                                $.extensionsX.forEach(($) => {
                                    exts.add($, null)
                                })
                                return pr.getEntry<null, api.TAnalysisResult>(
                                    exts.getDictionary(),
                                    filePath.extension,
                                    () => {
                                        return ["success", {
                                            pattern: pathPatternBuilder.getArray()
                                        }]

                                    },
                                    () => {
                                        return ["error", {
                                            error: ["unexpected extension", {}],
                                            path: fullPath
                                        }]

                                    }
                                )
                            }
                        })
                    case "type":
                        return pl.cc(ps.currentDirectory.type[1], ($) => {
                            return pr.getEntry(
                                $.nodesX,
                                fileNameWithExtension,
                                ($): api.TAnalysisResult => {
                                    switch ($.type[0]) {
                                        case "file":
                                            return pl.cc($.type[1], ($) => {
                                                pathPatternBuilder.push(fileNameWithExtension)

                                                return ["success", {
                                                    pattern: pathPatternBuilder.getArray(),
                                                }]
                                            })
                                        case "directory":
                                            return pl.cc($.type[1], ($): api.TAnalysisResult => {
                                                return ["error", {
                                                    error: ["expected directory instead of file", {}],
                                                    path: fullPath,
                                                }]
                                            })
                                        default: return pl.au($.type[0])
                                    }
                                },
                                (): api.TAnalysisResult => {
                                    return ["error", {
                                        error: ["unexpected file", {}],
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