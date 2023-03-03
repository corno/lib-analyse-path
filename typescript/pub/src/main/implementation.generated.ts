import { API } from "./definition/api.generated"
import { $$ as ianalysePath } from "./implementations/analysePath.p"
import { $$ as icreateAnnotatedPathErrorMessageCreator } from "./implementations/createAnnotatedPathErrorMessageCreator.p"
import { $$ as icreatePathErrorMessage } from "./implementations/createPathErrorMessage.p"
import { $$ as icreatePathMessageCreator } from "./implementations/createPathMessageCreator.p"

export const $a: API = {
    'analysePath': ianalysePath,
    'createAnnotatedPathErrorMessageCreator': icreateAnnotatedPathErrorMessageCreator,
    'createPathErrorMessage': icreatePathErrorMessage,
    'createPathMessageCreator': icreatePathMessageCreator,
}