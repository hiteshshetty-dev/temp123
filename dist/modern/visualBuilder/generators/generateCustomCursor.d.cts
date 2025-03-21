import { FieldDataType, ISchemaFieldMap } from '../utils/types/index.types.cjs';
import '../../cms/types/contentTypeSchema.types.cjs';

declare const FieldTypeIconsMap: Record<FieldDataType | "loading" | "empty", any>;
interface IGenerateCustomCursor {
    fieldType: FieldDataType | "loading" | "empty";
    customCursor: HTMLDivElement;
    fieldDisabled?: boolean;
}
declare function generateCustomCursor({ fieldType, customCursor, fieldDisabled, }: IGenerateCustomCursor): void;
declare function getFieldIcon(fieldSchema: ISchemaFieldMap): any;

export { FieldTypeIconsMap, generateCustomCursor, getFieldIcon };
