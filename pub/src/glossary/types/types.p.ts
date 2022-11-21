import * as pt from "pareto-core-types"

export type TParsedFilePath = {
    readonly "directoryPath": pt.Array<string>;
    readonly "baseName": string;
    readonly "extension": null | string;
}
