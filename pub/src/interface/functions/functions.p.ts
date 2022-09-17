import { TDirectory } from "../types/FileSystemStructure.p"
import { TParsedFilePath } from "api-pareto-path"
import * as tostring from "api-pareto-tostring"
import { TAnnotatedPathError, TPath, TPathError, TAnalysisResult } from "../types/AnalysisResult.p"
import { DMessageDependencies } from "../dependencies/dependencies.p"

export type FAnalysePath = (
    $: {
        readonly "definition": TDirectory,
        readonly "filePath": TParsedFilePath
    },
) => TAnalysisResult


export type FCreatePathErrorMessage = ($: TPathError) => string

export type FCreatePathMessage = (
    $: TPath,
    $d: DMessageDependencies,
) => string

export type FCreateAnnotatedPathErrorMessage = (
    $: TAnnotatedPathError,
    $d: DMessageDependencies,
) => string