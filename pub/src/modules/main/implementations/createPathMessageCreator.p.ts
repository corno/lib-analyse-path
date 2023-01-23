
import * as api from "../api"

export const $$: api.CcreatePathMessageCreator = ($d) => {
    return ($) => {
        return $d.sf_getArrayAsString({
            array: $,
            separator: "/"
        })
    }
}