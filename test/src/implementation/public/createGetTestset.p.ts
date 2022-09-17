
import * as pm from "pareto-core-state"
import * as pl from "pareto-core-lib"

import * as testLib from "lib-pareto-test"

import * as api from "../../interface"

import * as pub from "../../../../pub"

export const createGetTestset: api.FCreateGetTestset = ($, $d) => {


    return () => {


        const testSetsBuilder = pm.createUnsafeDictionaryBuilder<testLib.TTestElement>()


        function testError(
            pathString: string,
            expectedError: string,
            expectedPath: string,
        ) {
            const testsBuilder = pm.createUnsafeDictionaryBuilder<testLib.TTestElement>()

            const res = pub.f_analysePath(
                {
                    definition: $,
                    filePath: $d.parseFilePath(
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
                                type: ["simple string", {
                                    expected: expectedError,
                                    actual: pub.f_createPathErrorMessage($.error),
                                }]
                            }]
                        })

                        testsBuilder.add("path", {
                            type: ["test", {
                                type: ["simple string", {
                                    expected: expectedPath,
                                    actual: pub.f_createPathMessage($.path, $d.message),
                                }]
                            }]
                        })
                    })
                    break
                case "success":
                    pl.cc(res[1], ($) => {
                        testsBuilder.add("unexpected success", {
                            type: ["test", {
                                type: ["boolean", {
                                    test: false,
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
        function testSuccess(
            pathString: string,
            expectedPathPattern: string,
        ) {
            const testsBuilder = pm.createUnsafeDictionaryBuilder<testLib.TTestElement>()

            const res = pub.f_analysePath(
                {
                    definition: $,
                    filePath: $d.parseFilePath(
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
                                type: ["boolean", {
                                    test: false,
                                }]
                            }]
                        })
                    })
                    break
                case "success":
                    pl.cc(res[1], ($) => {
                        testsBuilder.add("pattern", {
                            type: ["test", {
                                type: ["simple string", {
                                    expected: expectedPathPattern,
                                    actual: `/${$d.message.getArrayAsString({
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
}

