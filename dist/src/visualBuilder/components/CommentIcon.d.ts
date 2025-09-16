import React from "preact/compat";
import { CslpData } from "../../cslp/types/cslp.types";
import { ISchemaFieldMap } from "../utils/types/index.types";
interface CommentIconProps {
    fieldMetadata: CslpData;
    fieldSchema: ISchemaFieldMap;
    invertTooltipPosition: boolean;
}
interface Field {
    uid: string;
    path: string;
    og_path: string;
}
export interface IActiveDiscussion {
    uid: string;
    title?: string;
    field?: Field;
}
export default function CommentIcon(props: CommentIconProps): React.JSX.Element | null;
export {};
//# sourceMappingURL=CommentIcon.d.ts.map