import { CslpData } from '../../cslp/types/cslp.types.cjs';
import { ISchemaFieldMap } from './types/index.types.cjs';
import { IActiveDiscussion } from '../components/CommentIcon.cjs';
import '../../cms/types/contentTypeSchema.types.cjs';
import 'react/jsx-runtime';

interface GetDiscussionIdParams {
    fieldMetadata: CslpData;
    fieldSchema: ISchemaFieldMap;
}
/**
 * Retrieves the discussion data based on the field metadata and field UID.
 *
 * @param params The parameters including field metadata and field UID.
 * @returns A promise that resolves to the discussion data as a string.
 */
declare function getDiscussionIdByFieldMetaData(params: GetDiscussionIdParams): Promise<IActiveDiscussion | null>;

export { getDiscussionIdByFieldMetaData };
