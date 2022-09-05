import { TDirectory } from "./types/FileSystemStructure"
import { TParsedFilePath } from "api-pareto-path"
import { TAnnotatedPathError, TPath, TPathError, TAnalysisResult } from "./types/AnalysisResult"

export type FAnalysePath = (
    $: {
        readonly "definition": TDirectory,
        readonly "filePath": TParsedFilePath
    },
) => TAnalysisResult


export type FCreatePathErrorMessage = ($: TPathError) => string
export type FCreatePathMessage = ($: TPath) => string
export type FCreateAnnotatedPathErrorMessage = ($: TAnnotatedPathError) => string