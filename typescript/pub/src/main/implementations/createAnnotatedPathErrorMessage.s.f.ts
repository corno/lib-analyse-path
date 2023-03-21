import { A } from "../api.generated"

import { $$ as f_createPathErrorMessage } from "./createPathErrorMessage.s.f"
import { $$ as f_createPathMessage } from "./createPathMessage.s.f"

export const $$: A.createAnnotatedPathErrorMessage= ($d) => {
    return ($) => {
        return `${f_createPathMessage(
            $d,
            null,
        )(
            $.path,
        )}: ${f_createPathErrorMessage()($.error)}`
    }
}