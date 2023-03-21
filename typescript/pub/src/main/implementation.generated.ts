import { API } from "./api.generated"
import { $$ as ianalysePath } from "./implementations/analysePath.s.f"
import { $$ as icreateAnnotatedPathErrorMessage } from "./implementations/createAnnotatedPathErrorMessage.s.f"
import { $$ as icreatePathErrorMessage } from "./implementations/createPathErrorMessage.s.f"
import { $$ as icreatePathMessage } from "./implementations/createPathMessage.s.f"

export const $api: API = {
    'analysePath': ianalysePath,
    'createAnnotatedPathErrorMessage': icreateAnnotatedPathErrorMessage,
    'createPathErrorMessage': icreatePathErrorMessage,
    'createPathMessage': icreatePathMessage,
}