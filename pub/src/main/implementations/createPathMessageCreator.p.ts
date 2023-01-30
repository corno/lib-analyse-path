
import * as api from "../api"

export const $$: api.CcreatePathMessageCreator = ($d) => {
    return ($) => {
        return $d.getArrayAsString({
            array: $,
            separator: "/"
        })
    }
}