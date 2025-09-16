import { CslpData } from "../../cslp/types/cslp.types";
import { ISchemaFieldMap } from "./types/index.types";
import { IActiveDiscussion } from "../components/CommentIcon";
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
export declare function getDiscussionIdByFieldMetaData(params: GetDiscussionIdParams): Promise<IActiveDiscussion | null>;
export {};
//# sourceMappingURL=getDiscussionIdByFieldMetaData.d.ts.map