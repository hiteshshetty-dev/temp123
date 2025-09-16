import * as react_jsx_runtime from 'react/jsx-runtime';
import { CslpData } from '../../cslp/types/cslp.types.js';
import { ISchemaFieldMap } from '../utils/types/index.types.js';
import '../../cms/types/contentTypeSchema.types.js';

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
interface IActiveDiscussion {
    uid: string;
    title?: string;
    field?: Field;
}
declare function CommentIcon(props: CommentIconProps): react_jsx_runtime.JSX.Element | undefined;

export { type IActiveDiscussion, CommentIcon as default };
