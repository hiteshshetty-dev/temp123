import { CslpData } from "../../cslp/types/cslp.types";
import { ISchemaFieldMap } from "../utils/types/index.types";
import { IActiveDiscussion } from "../components/CommentIcon";
export interface IHighlightFieldMetadata extends Omit<CslpData, 'instance' | 'multipleFieldMetadata'> {
}
export type IFieldSchemaForDiscussion = Pick<ISchemaFieldMap, "uid" | "display_name" | "data_type">;
export interface IHighlightCommentData {
    fieldMetadata: IHighlightFieldMetadata;
    fieldSchema: IFieldSchemaForDiscussion;
    discussion: IActiveDiscussion;
    absolutePath: string;
}
export interface IHighlightComments {
    payload: IHighlightCommentData[];
}
export interface IHighlightCommentsEvent {
    data: IHighlightComments;
}
export declare const useHighlightCommentIcon: () => void;
//# sourceMappingURL=useHighlightCommentIcon.d.ts.map