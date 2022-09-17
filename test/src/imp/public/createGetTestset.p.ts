
import * as pa from "pareto-core-async"
import * as pm from "pareto-core-state"
import * as pl from "pareto-core-lib"

import * as testLib from "lib-pareto-test"

import * as api from "../../interface"

import * as pub from "../../../../pub"


import { _testProject } from "../../data/testProject"
import { createPathErrorMessage } from "../../../../pub"

export const f_createGetTestset: api.FCreateGetTestset = ($d) => {


    return () => {


        const testSetsBuilder = pm.createDictionaryBuilder<testLib.TTestElement>(
            ["ignore", null],
            () => {
                pl.panic('testnames are not unique')
            }
        )


        function testError(
            pathString: string,
            expectedError: string,
            expectedPath: string,
        ) {
            const testsBuilder = pm.createDictionaryBuilder<testLib.TTestElement>(
                ["ignore", null],
                () => {
                    pl.panic('testnames are not unique')
                }
            )

            const res = pub.analysePath(
                {
                    definition: _testProject,
                    filePath: $d.parseFilePath(
                        {
                            filePath: pathString
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
                                    actual: createPathErrorMessage($.error),
                                }]
                            }]
                        })

                        testsBuilder.add("path", {
                            type: ["test", {
                                type: ["simple string", {
                                    expected: expectedPath,
                                    actual: pub.createPathMessage($.path),
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
            const testsBuilder = pm.createDictionaryBuilder<testLib.TTestElement>(
                ["ignore", null],
                () => {
                    pl.panic('testnames are not unique')
                }
            )

            const res = pub.analysePath(
                {
                    definition: _testProject,
                    filePath: $d.parseFilePath(
                        {
                            filePath: pathString
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
                                    actual: `/${pts.getArrayAsString($.pattern, "/")}`,
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

        return pa.value({
            elements: testSetsBuilder.getDictionary()
        })
    }
}

