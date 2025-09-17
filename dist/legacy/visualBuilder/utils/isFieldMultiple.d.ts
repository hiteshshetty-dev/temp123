import { ISchemaFieldMap } from './types/index.types.js';
import '../../cms/types/contentTypeSchema.types.js';

declare function isFieldMultiple(fieldSchema: ISchemaFieldMap): boolean;

export { isFieldMultiple };
