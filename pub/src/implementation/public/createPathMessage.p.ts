
import * as api from "../../glossary"
export const f_createPathMessage: api.FCreatePathMessage = ($, $d) => {
    return $d.getArrayAsString({
        array: $,
        separator: "/"
    })
}