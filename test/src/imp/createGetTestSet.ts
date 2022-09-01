
import * as pa from "pareto-core-async"
import * as pm from "pareto-core-state"
import * as pl from "pareto-core-lib"
import * as pts from "pareto-core-tostring"

import * as test from "lib-pareto-test"

import * as pub from "../../../pub/dist"

import * as path from "api-pareto-path"

import { _testProject } from "../data/testProject"


export function createGetTestSet(
    $d: {
        parseFilePath: path.ParseFilePath
    }
): test.GetTestSet {

    return () => {


        const testSetsBuilder = pm.createDictionaryBuilder<test.TTestElement>(
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
            const testsBuilder = pm.createDictionaryBuilder<test.TTestElement>(
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
    
        return pa.value({
            elements: testSetsBuilder.getDictionary()
        })
    }
}

