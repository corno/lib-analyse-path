import { TDirectory } from "./types/FileSystemStructure"
import { TParsedFilePath } from "api-pareto-path"
import { TAnalysisResult } from "./types/AnalysisResult"

export type AnalysePath = (
    $: {
        definition: TDirectory,
        filePath: TParsedFilePath
    },
) => TAnalysisResult
