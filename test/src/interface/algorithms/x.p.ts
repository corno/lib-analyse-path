import * as test from "lib-pareto-test"
import { DDependencies } from "../dependencies/x"

export type FCreateGetTestset = (
    $d: DDependencies
) => test.GetTestSet