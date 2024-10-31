import { CslpData } from '../../cslp/types/cslp.types.js';
import { ISchemaFieldMap } from '../utils/types/index.types.js';
import { IActiveDiscussion } from '../components/CommentIcon.js';
import '../../cms/types/contentTypeSchema.types.js';
import 'react/jsx-runtime';

interface IHighlightFieldMetadata extends Omit<CslpData, 'instance' | 'multipleFieldMetadata'> {
}
type IFieldSchemaForDiscussion = Pick<ISchemaFieldMap, "uid" | "display_name" | "data_type">;
interface IHighlightCommentData {
    fieldMetadata: IHighlightFieldMetadata;
    fieldSchema: IFieldSchemaForDiscussion;
    discussion: IActiveDiscussion;
    absolutePath: string;
}
interface IHighlightComments {
    payload: IHighlightCommentData[];
}
interface IHighlightCommentsEvent {
    data: IHighlightComments;
}
declare const useHighlightCommentIcon: () => void;

export { type IFieldSchemaForDiscussion, type IHighlightCommentData, type IHighlightComments, type IHighlightCommentsEvent, type IHighlightFieldMetadata, useHighlightCommentIcon };