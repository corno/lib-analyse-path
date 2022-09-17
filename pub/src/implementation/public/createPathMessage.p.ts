
import * as api from "../../interface"
export const f_createPathMessage: api.FCreatePathMessage = ($, $d) => {
    return $d.getArrayAsString({
        array: $,
        separator: "/"
    })
}