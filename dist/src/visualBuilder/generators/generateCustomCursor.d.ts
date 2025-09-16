import { FieldDataType, ISchemaFieldMap } from "../utils/types/index.types";
export declare const FieldTypeIconsMap: Record<FieldDataType | "loading" | "empty" | "discussion", any>;
interface IGenerateCustomCursor {
    fieldType: FieldDataType | "loading" | "empty" | "discussion";
    customCursor: HTMLDivElement;
    fieldDisabled?: boolean;
}
export declare function generateCustomCursor({ fieldType, customCursor, fieldDisabled, }: IGenerateCustomCursor): void;
export declare function getFieldIcon(fieldSchema: ISchemaFieldMap): any;
export {};
//# sourceMappingURL=generateCustomCursor.d.ts.map