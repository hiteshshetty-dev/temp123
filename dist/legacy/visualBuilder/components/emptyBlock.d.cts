import { CslpData } from '../../cslp/types/cslp.types.cjs';
import { ISchemaFieldMap } from '../utils/types/index.types.cjs';
import '../../cms/types/contentTypeSchema.types.cjs';

interface EmptyBlockProps {
    details: {
        fieldMetadata: CslpData;
        fieldSchema: ISchemaFieldMap;
    };
}
declare function EmptyBlock(props: EmptyBlockProps): JSX.Element;

export { EmptyBlock };
