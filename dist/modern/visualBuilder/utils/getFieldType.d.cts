import { ISchemaFieldMap, FieldDataType } from './types/index.types.cjs';
import '../../cms/types/contentTypeSchema.types.cjs';

declare function getFieldType(fieldSchema: ISchemaFieldMap): FieldDataType;

export { getFieldType };
