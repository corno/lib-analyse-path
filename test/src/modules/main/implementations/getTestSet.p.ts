
import * as pm from "pareto-core-state"
import * as pl from "pareto-core-lib"

import * as mtest from "lib-pareto-test"
import * as mpath from "res-pareto-path"
import * as mtostring from "res-pareto-tostring"

import * as api from "../api"

import * as pub from "../../../../../pub"
import { data } from "../../../data/data.p"

export const $$: api.CgetTestSet = () => {

    const $ = data
    const testSetsBuilder = pm.createUnsafeDictionaryBuilder<mtest.TTestElement>()


    function testError(
        pathString: string,
        expectedError: string,
        expectedPath: string,
    ) {
        const testsBuilder = pm.createUnsafeDictionaryBuilder<mtest.TTestElement>()

        const res = pub.$a.analysePath(
            {
                definition: $,
                filePath: mpath.$a.parseFilePath(
                    {
                        filePath: pathString,
                        pathSeparator: "/",
                    }
                )
            }
        )

        switch (res[0]) {
            case "error":
                pl.cc(res[1], ($) => {
                    testsBuilder.add("error type", {
                        type: ["test", {
                            type: ["short string", {
                                expected: expectedError,
                                actual: pub.$a.createPathErrorMessage($.error),
                            }]
                        }]
                    })

                    testsBuilder.add("path", {
                        type: ["test", {
                            type: ["short string", {
                                expected: expectedPath,
                                actual: pub.$a.createPathMessageCreator({
                                    getArrayAsString: mtostring.$a.getArrayAsString
                                })($.path),
                            }]
                        }]
                    })
                })
                break
            case "success":
                pl.cc(res[1], ($) => {
                    testsBuilder.add("unexpected success", {
                        type: ["test", {
                            type: ["boolean", false]
                        }]
                    })
                })
                break
            default: pl.au(res[0])
        }

        testSetsBuilder.add(pathString, {
            type: ["subset", {
                elements: testsBuilder.getDictionary()
            }]
        })
    }
    function testSuccess(
        pathString: string,
        expectedPathPattern: string,
    ) {
        const testsBuilder = pm.createUnsafeDictionaryBuilder<mtest.TTestElement>()

        const res = pub.$a.analysePath(
            {
                definition: $,
                filePath: mpath.$a.parseFilePath(
                    {
                        filePath: pathString,
                        pathSeparator: "/",
                    }
                )
            }
        )

        switch (res[0]) {
            case "error":
                pl.cc(res[1], ($) => {
                    testsBuilder.add("unexpected error", {
                        type: ["test", {
                            type: ["boolean", false]
                        }]
                    })
                })
                break
            case "success":
                pl.cc(res[1], ($) => {
                    testsBuilder.add("pattern", {
                        type: ["test", {
                            type: ["short string", {
                                expected: expectedPathPattern,
                                actual: `/${mtostring.$a.getArrayAsString({
                                    array: $.pattern,
                                    separator: "/"
                                })}`,
                            }]
                        }]
                    })
                })
                break
            default: pl.au(res[0])
        }

        testSetsBuilder.add(pathString, {
            type: ["subset", {
                elements: testsBuilder.getDictionary()
            }]
        })
    }

    testError("f.txt/x.txt", "expected file instead of directory", "f.txt")
    testError("foo", "unexpected file", "foo")
    testError("foo/bar", "unexpected directory", "foo")
    testError("ddd", "expected directory instead of file", "ddd")
    testError("ddd/f.txt", "expected directory (any name)", "ddd/f.txt")
    testError("ddd/x/y.txt", "unexpected file", "ddd/x/y.txt")
    testError("td/y.txt", "unexpected file", "td/y.txt")
    testError("fdd/y.foo", "unexpected extension", "fdd/y.foo")
    testError("fddnr/a/y.txt", "did not expect a directory", "fddnr/a")

    testSuccess("f.txt", "/f.txt")
    testSuccess("ddd/x/f.txt", "/ddd/*/f.txt")
    testSuccess("td/f.txt", "/td/f.txt")
    testSuccess("fdd/y.txt", "/fdd/**/*.txt")
    testSuccess("fdd/a/y.txt", "/fdd/**/*.txt")

    return pl.asyncValue({
        elements: testSetsBuilder.getDictionary()
    })
}