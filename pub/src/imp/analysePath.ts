
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


import * as api from "../interface"

export const analysePath: api.AnalysePath = ($) => {
    const fileNameWithExtension = `${$.filePath.baseName}${$.filePath.extension === null ? "" : `.${$.filePath.extension}`}`


    const filePath = $.filePath

    type State =
        | ["error", api.PathError]
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
                                if (!$.recursive) {
                                    state = ["error", ["did not expect a directory", {}]]
                                }
                            })
                            break
                        case "type":
                            pl.cc(processingState.currentDirectory.type[1], ($) => {
                                pr.getEntry(
                                    pw.wrapRawDictionary($.nodes),
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
                const ps = $
                switch (ps.currentDirectory.type[0]) {
                    case "directory dictionary":
                        return pl.cc(ps.currentDirectory.type[1], ($) => {
                            return ["error", {
                                error: ["expected directory (any name)", {}],
                                path: null
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
                                        path: null
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
                                pw.wrapRawArray($.extensions).forEach(($) => {
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
                                            path: null
                                        }]

                                    }
                                )
                            }
                        })
                    case "type":
                        return pl.cc(ps.currentDirectory.type[1], ($) => {
                            return pr.getEntry(
                                pw.wrapRawDictionary($.nodes),
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
                                                    path: null,
                                                }]
                                            })
                                        default: return pl.au($.type[0])
                                    }
                                },
                                (): api.TAnalysisResult => {
                                    return ["error", {
                                        error: ["unexpected file", {}],
                                        path: null,
                                    }]
                                }
                            )
                        })
                    default: return pl.au(ps.currentDirectory.type[0])
                }
            })
        default: return pl.au(state[0])
    }

    // switch ([0]) {
    //     case "":
    //         pl.cc([1], ($) => {

    //         })
    //         break
    //     default: pl.au([0])
    // }
    // return {
    //     error: null,
    //     path: "FIXME",
    //     pathPattern: "FIXME",
    // }

    // type PathIterator<T> = {
    //     // splittedPath: string[],
    //     // posx: number,
    //     next(): PathIterator<T>,
    //     hasMoreSteps(): boolean,
    //     getCurrentStepName(): T,
    //     getCurrentSteps(): T[],
    // }

    // // function createPathIterator<T>(
    // //     splittedPath: pt.Array<T>
    // // ): PathIterator<T> {
    // //     function create(
    // //         pos: number
    // //     ): PathIterator<T> {
    // //         return {
    // //             next() {
    // //                 return create(pos + 1)
    // //             },
    // //             hasMoreSteps() {
    // //                 return splittedPath.length > pos
    // //             },
    // //             getCurrentStepName() {
    // //                 return splittedPath[pos]
    // //             },
    // //             getCurrentSteps() {
    // //                 return splittedPath.slice(0, pos)
    // //             }
    // //         }
    // //     }
    // //     return create(0)
    // // }
    // function createAnalysisResult(
    //     pi: PathIterator<string>,
    //     pathPattern: string,
    //     error: null | string,
    // ): TAnalysisResult {

    //     return {
    //         pathPattern: pathPattern,
    //         path: ((): string[] => {
    //             if (pi.hasMoreSteps()) {
    //                 return pi.getCurrentSteps()

    //             } else {
    //                 return pi.getCurrentSteps().concat([fileNameWithExtension])

    //             }
    //         })(),
    //         error: error,
    //     }
    // }

    // function analyseDictionary(
    //     pathStack: pm.Sta<string>,
    //     $d: TDirectory,
    //     pathPattern: string,
    // ): TAnalysisResult {
    //     switch ($d.type[0]) {
    //         case "directory dictionary":
    //             return pl.cc($d.type[1], ($d) => {
    //                 if (pi.hasMoreSteps()) {

    //                     return analyseDictionary(
    //                         pi.next(),
    //                         $d.definition,
    //                         `${pathPattern}/*`,
    //                     )
    //                 } else {
    //                     return createAnalysisResult(
    //                         pi,
    //                         `${pathPattern}/*`,
    //                         "expected directory (any name)",
    //                     )
    //                 }
    //             })
    //         case "files dictionary":
    //             return pl.cc($d.type[1], ($d) => {
    //                 function handleFile(
    //                     pi: PathIterator<string>,
    //                 ): TAnalysisResult {
    //                     const newPathPattern = `${pathPattern}${$d.recursive ? "/**" : ""}/*.${$.filePath.extension}`

    //                     if ($.filePath.extension === null) {
    //                         if (!$d["allow missing extension"]) {
    //                             return createAnalysisResult(
    //                                 pi,
    //                                 newPathPattern,
    //                                 `unexpected missing extension`,
    //                             )
    //                         } else {
    //                             return createAnalysisResult(
    //                                 pi,
    //                                 newPathPattern,
    //                                 null,
    //                             )
    //                         }
    //                     } else {
    //                         if ($i.arrayIncludes($d.extensions, $.filePath.extension)) {
    //                             return createAnalysisResult(
    //                                 pi,
    //                                 newPathPattern,
    //                                 null,
    //                             )
    //                         } else {
    //                             return createAnalysisResult(
    //                                 pi,
    //                                 newPathPattern,
    //                                 `unexpected extension: '${$.filePath.extension}'`,
    //                             )
    //                         }
    //                     }
    //                 }

    //                 function recurse(
    //                     pi: PathIterator<string>
    //                 ): TAnalysisResult {
    //                     if (pi.hasMoreSteps()) {
    //                         return recurse(pi.next())
    //                     } else {
    //                         return handleFile(
    //                             pi,
    //                         )
    //                     }
    //                 }
    //                 if ($d.recursive) {
    //                     return recurse(pi)
    //                 } else {
    //                     if (pi.hasMoreSteps()) {
    //                         return createAnalysisResult(
    //                             pi,
    //                             `${pathPattern}${$d.recursive ? "/**" : ""}/*[${$d.extensions.join(",")}]`,
    //                             "did not expect a directory",
    //                         )
    //                     } else {
    //                         return handleFile(
    //                             pi,
    //                         )
    //                     }
    //                 }
    //             })
    //         case "type":
    //             return pl.cc($d.type[1], ($d) => {
    //                 if (pi.hasMoreSteps()) {
    //                     const name = pi.getCurrentStepName()
    //                     const node = $d.nodes[name]
    //                     if (node === undefined) {
    //                         return createAnalysisResult(
    //                             pi,
    //                             `${pathPattern}`,
    //                             `unexpected directory: '${name}'`,
    //                         )
    //                     } else {
    //                         switch (node.type[0]) {
    //                             case "directory":
    //                                 return pl.cc(node.type[1], ($) => {
    //                                     return analyseDictionary(
    //                                         pi.next(),
    //                                         $,
    //                                         `${pathPattern}/${name}`
    //                                     )
    //                                 })
    //                             case "file":
    //                                 return pl.cc(node.type[1], ($) => {
    //                                     return createAnalysisResult(
    //                                         pi,
    //                                         `${pathPattern}/${name}`,
    //                                         `expected file instead of directory`,
    //                                     )
    //                                 })
    //                             default:
    //                                 return pl.au(node.type[0])
    //                         }
    //                     }
    //                 } else {
    //                     const node = $d.nodes[fileNameWithExtension]
    //                     if (node === undefined) {
    //                         return createAnalysisResult(
    //                             pi,
    //                             `${pathPattern}`,
    //                             `unexpected file: '${fileNameWithExtension}'`,
    //                         )
    //                     } else {
    //                         switch (node.type[0]) {
    //                             case "directory":
    //                                 return pl.cc(node.type[1], ($) => {
    //                                     return createAnalysisResult(
    //                                         pi,
    //                                         `${pathPattern}/${fileNameWithExtension}`,
    //                                         `expected directory instead of file`,
    //                                     )
    //                                 })
    //                             case "file":
    //                                 return pl.cc(node.type[1], (node) => {
    //                                     return createAnalysisResult(
    //                                         pi,
    //                                         `${pathPattern}/${fileNameWithExtension}`,
    //                                         null,
    //                                     )
    //                                 })
    //                             default:
    //                                 return pl.au(node.type[0])
    //                         }
    //                     }
    //                 }
    //             })
    //         default:
    //             return pl.au($d.type[0])
    //     }
    // }
    // const stack = pm.createStack<string>()
    // $.filePath.directoryPath.forEach(($) => {
    //     stack.push($)
    // })
    // return analyseDictionary(
    //     stack,
    //     $.definition,
    //     "",
    // )
}
