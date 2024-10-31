import { CslpData } from '../../cslp/types/cslp.types.js';
import { ISchemaFieldMap } from '../utils/types/index.types.js';
import '../../cms/types/contentTypeSchema.types.js';

interface EmptyBlockProps {
    details: {
        fieldMetadata: CslpData;
        fieldSchema: ISchemaFieldMap;
    };
}
declare function EmptyBlock(props: EmptyBlockProps): JSX.Element;

export { EmptyBlock };
