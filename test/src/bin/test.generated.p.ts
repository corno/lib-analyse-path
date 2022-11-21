#!/usr/bin/env node

import * as pe from "pareto-core-exe"

import * as test from "lib-pareto-test"
import * as tostring from "res-pareto-tostring"

import { createGetTestset } from "../implementation"
import { data } from "../data/data.p"
import * as path from "res-pareto-path"

import * as pub from "../../../pub"

pe.runProgram(
    test.f_createTester(
        null,
        {
            getTestSet: createGetTestset(
                data,
                {
                    parseFilePath: path.f_parseFilePath,
                    message: {
                        getArrayAsString: tostring.f_getArrayAsString
                    },
                }
            ),
            dependencies: test.dependencies,
        },
    )
)
