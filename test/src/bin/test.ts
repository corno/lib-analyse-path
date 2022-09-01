#!/usr/bin/env node

import * as pe from "pareto-core-exe"

import * as test from "lib-pareto-test"

import * as diff from "res-pareto-diff"
import * as fs from "res-pareto-filesystem"

import { createGetTestSet } from "../imp/createGetTestSet"
import { getDepedencies } from "./getDependencies"


const getTestSet = createGetTestSet(
    getDepedencies()
)

pe.runProgram(
    test.createTester(
        {
            getTestSet: getTestSet,
            diff: {
                diffData: diff.diffData,
                stringsAreEqual: diff.stringsAreEqual,
            },
            fs: {
                readFile: fs.readFile,
                writeFile: fs.writeFile,
                unlink: fs.unlink,
            },
        },
    )
)
