import * as test from "lib-pareto-test"

import * as pub from "../../../../pub"
import { DDependencies } from "../dependencies/dependencies.p"

export type FCreateGetTestset = (
    $: pub.TDirectory,
    $d: DDependencies
) => test.FGetTestSet