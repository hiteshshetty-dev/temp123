import { ISchemaFieldMap, FieldDataType } from './types/index.types.js';
import '../../cms/types/contentTypeSchema.types.js';

declare function getFieldType(fieldSchema: ISchemaFieldMap): FieldDataType;

export { getFieldType };
