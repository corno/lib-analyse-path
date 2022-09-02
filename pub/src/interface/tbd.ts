import { TDirectory } from "./types/FileSystemStructure"
import { TParsedFilePath } from "api-pareto-path"
import { AnnotatedPathError, Path, PathError, TAnalysisResult } from "./types/AnalysisResult"

export type AnalysePath = (
    $: {
        definition: TDirectory,
        filePath: TParsedFilePath
    },
) => TAnalysisResult


export type CreatePathErrorMessage = ($: PathError) => string
export type CreatePathMessage = ($: Path) => string
export type CreateAnnotatedPathErrorMessage = ($: AnnotatedPathError) => string