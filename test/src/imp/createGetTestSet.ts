
import * as pa from "pareto-core-async"
import * as pm from "pareto-core-state"
import * as pl from "pareto-core-lib"
import * as pts from "pareto-core-tostring"

import * as testLib from "lib-pareto-test"

import * as pub from "../../../pub"

import * as path from "api-pareto-path"

import { _testProject } from "../data/testProject"
import { createPathErrorMessage } from "../../../pub"


export function createGetTestSet(
    $d: {
        parseFilePath: path.ParseFilePath
    }
): testLib.GetTestSet {

    return () => {


        const testSetsBuilder = pm.createDictionaryBuilder<testLib.TTestElement>(
            ["ignore", {}],
            () => {
                pl.panic('testnames are not unique')
            }
        )


        function testError(
            pathString: string,
            expectedError: string,
            expectedPath: string | null,
        ) {
            const testsBuilder = pm.createDictionaryBuilder<testLib.TTestElement>(
                ["ignore", {}],
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
                        if (expectedPath === null) {
                            if (pl.isNotNull($.path)) {
                                testsBuilder.add("unexpected path", {
                                    type: ["test", {
                                        type: ["boolean", {
                                            test: false,
                                        }]
                                    }]
                                })
                            } else {
                                testsBuilder.add("no path", {
                                    type: ["test", {
                                        type: ["boolean", {
                                            test: true,
                                        }]
                                    }]
                                })
                            }
                        } else {
                            if (pl.isNotNull($.path)) {
                                testsBuilder.add("path", {
                                    type: ["test", {
                                        type: ["simple string", {
                                            expected: expectedPath,
                                            actual: pub.createPathMessage($.path),
                                        }]
                                    }]
                                })

                            } else {
                                testsBuilder.add("missing path", {
                                    type: ["test", {
                                        type: ["boolean", {
                                            test: false,
                                        }]
                                    }]
                                })
                            }
                        }
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
                ["ignore", {}],
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
        testError("foo", "unexpected file", null)
        testError("foo/bar", "unexpected directory", "foo")
        testError("ddd", "expected directory instead of file", null)
        testError("ddd/f.txt", "expected directory (any name)", null)
        testError("ddd/x/y.txt", "unexpected file", null)
        testError("td/y.txt", "unexpected file", null)
        testError("fdd/y.foo", "unexpected extension", null)
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

