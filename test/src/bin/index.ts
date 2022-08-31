#!/usr/bin/env node

import * as pl from "pareto-core-lib"
import * as pe from "pareto-core-exe"
import * as pw from "pareto-core-raw"
import * as pm from "pareto-core-state"
import * as pts from "pareto-core-tostring"

import * as exeLib from "lib-pareto-exe"
import * as path from "res-pareto-path"
import * as testLib from "lib-pareto-test"
import * as diff from "res-pareto-diff"

import * as pub from "../../../pub"
import { _testProject } from "../data/testProject"

function createTestSet(): testLib.TTestSet {

    const testSetsBuilder = pm.createDictionaryBuilder<testLib.TTestElement>(
        ["ignore", {}],
        () => {
            pl.panic('testnames are not unique')
        }
    )


    function test(
        pathString: string,
        expectedPathPattern: string | null,
        expectedError: string | null,
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
                filePath: path.parseFilePath(
                    {
                        filePath: pathString
                    }
                )
            }
        )

        switch (res[0]) {
            case "error":
                pl.cc(res[1], ($) => {
                    if (expectedError === null) {
                        testsBuilder.add("unexpected error", {
                            type: ["test", {
                                type: ["boolean", {
                                    test: false,
                                }]
                            }]
                        })
                    } else {
                        testsBuilder.add("error type", {
                            type: ["test", {
                                type: ["simple string", {
                                    expected: expectedError,
                                    actual: $.error[0],
                                }]
                            }]
                        })
                        if (expectedPath === null) {
                            if ($.path !== null) {
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
                            if ($.path !== null) {
                                testsBuilder.add("path", {
                                    type: ["test", {
                                        type: ["simple string", {
                                            expected: expectedPath,
                                            actual: `/${pts.getArrayAsString($.path, "/")}`,
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

                    }
                    if ($.path === null) {
                    } else {
                        // $.path.forEach(($) => {
                        //     pl.logDebugMessage(`\t${$}`)

                        // })
                    }

                })
                break
            case "success":
                pl.cc(res[1], ($) => {
                    if (expectedPathPattern === null) {
                        testsBuilder.add("unexpected pattern", {
                            type: ["test", {
                                type: ["boolean", {
                                    test: false,
                                }]
                            }]
                        })

                    } else {
                        testsBuilder.add("pattern", {
                            type: ["test", {
                                type: ["simple string", {
                                    expected: expectedPathPattern,
                                    actual: `/${pts.getArrayAsString($.pattern, "/")}`,
                                }]
                            }]
                        })
                    }
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
    function testError(
        pathString: string,
        expectedError: string,
        expectedPath: string | null,
    ) {
        test(
            pathString,
            null,
            expectedError,
            expectedPath
        )
    }
    function testSuccess(
        pathString: string,
        expectedPathPattern: string,
    ) {
        test(
            pathString,
            expectedPathPattern,
            null,
            null,
        )
    }

    testError("f.txt/x.txt", "expected file instead of directory", "/f.txt")
    testError("foo", "unexpected file", null)
    testError("foo/bar", "unexpected directory", "/foo")
    testError("ddd", "expected directory instead of file", null)
    testError("ddd/f.txt", "expected directory (any name)", null)
    testError("ddd/x/y.txt", "unexpected file", null)
    testError("td/y.txt", "unexpected file", null)
    testError("fdd/y.foo", "unexpected extension", null)
    testError("fddnr/a/y.txt", "did not expect a directory", "/fddnr/a")

    testSuccess("f.txt", "/f.txt")
    testSuccess("ddd/x/f.txt", "/ddd/*/f.txt")
    testSuccess("td/f.txt", "/td/f.txt")
    testSuccess("fdd/y.txt", "/fdd/**/*.txt")
    testSuccess("fdd/a/y.txt", "/fdd/**/*.txt")

    return {
        elements: testSetsBuilder.getDictionary()
    }
}


pe.runProgram(($, $i, $d) => {

    $d.startAsync(
        testLib.runTests(
            {
                testSet: createTestSet()
            },
            {
                onDone: ($) => {
                    testLib.serializeTestResult(
                        {
                            testResult: $,
                            showSummary: true,
                        },
                        {
                            // log: exeLib.createLogger(
                            //     {
                            //         writer: $i.stdout,
                            //         newline: "\n"
                            //     }
                            // )
                            log: ($) => {
                                pl.logDebugMessage($)
                            }
                        }
                    )
                }
            },
            {
                validateFile: {
                    file: () => {
                        pl.panic("!!!!")
                    },
                    writeFile: () => {
                        pl.panic("!!!!")
                    },
                    unlink: () => {
                        pl.panic("!!!!")
                    },
                    startAsync: $d.startAsync,
                    diffData: diff.diffData,
                },
                diffData: diff.diffData,
                startAsync: $d.startAsync,
            }
        )
    )

})







// pt.runTests(
//     {
//         callback: ($i) => {

//             $i.subset(
//                 "path tests",
//                 ($i) => {

//                     function test(
//                         pathString: string,
//                         expectedError: string | null,
//                         expectedPathPattern: string,
//                         expectedPath: string,
//                     ) {
//                         $i.subset(
//                             pathString,
//                             ($i) => {
//                                 const res = ap.analysePath(
//                                     _testProject,
//                                     ap.parseFilePath(pathString)
//                                 )
//                                 if (expectedError === null) {
//                                     $i.assert({
//                                         testName: "expect no error",
//                                         condition: res.error === null,
//                                     })
//                                 } else {
//                                     if (res.error === null) {
//                                         $i.assert({
//                                             testName: "expect an error",
//                                             condition: false,
//                                         })
//                                     } else {
//                                         $i.testString({
//                                             testName: "error",
//                                             expected: expectedError,
//                                             actual: res.error,
//                                         })
//                                     }
//                                 }
//                                 $i.testString({
//                                     testName: "path",
//                                     expected: expectedPath,
//                                     actual: `/${res.path.join("/")}`,
//                                 })
//                                 $i.testString({
//                                     testName: "path pattern",
//                                     expected: expectedPathPattern,
//                                     actual: res.pathPattern,
//                                 })
//                             },
//                         )
//                     }

//                     test("f.txt", null, "/f.txt", "/f.txt")
//                     test("f.txt/x.txt", "expected file instead of directory", "/f.txt", "/")
//                     test("foo", "unexpected file: 'foo'", "", "/foo")
//                     test("foo/bar", "unexpected directory: 'foo'", "", "/")
//                     test("ddd", "expected directory instead of file", "/ddd", "/ddd")
//                     test("ddd/f.txt", "expected directory (any name)", "/ddd/*", "/ddd/f.txt")
//                     test("ddd/x/f.txt", null, "/ddd/*/f.txt", "/ddd/x/f.txt")
//                     test("ddd/x/y.txt", "unexpected file: 'y.txt'", "/ddd/*", "/ddd/x/y.txt")
//                     test("td/f.txt", null, "/td/f.txt", "/td/f.txt")
//                     test("td/y.txt", "unexpected file: 'y.txt'", "/td", "/td/y.txt")
//                     test("fdd/y.txt", null, "/fdd/**/*.txt", "/fdd/y.txt")
//                     test("fdd/a/y.txt", null, "/fdd/**/*.txt", "/fdd/a/y.txt")
//                     test("fdd/y.foo", "unexpected extension: 'foo'", "/fdd/**/*.foo", "/fdd/y.foo")
//                     test("fddnr/a/y.txt", "did not expect a directory", "/fddnr/*[txt]", "/fddnr")
//                 },
//             )
//         },
//         log: ($) => {
//             const out = pr.createStdOut()
//             out.write($)
//             out.write("\n")
//         },
//     }
// )
