import { ISchemaFieldMap } from './types/index.types.cjs';
import '../../cms/types/contentTypeSchema.types.cjs';

declare function isFieldMultiple(fieldSchema: ISchemaFieldMap): boolean;

export { isFieldMultiple };
