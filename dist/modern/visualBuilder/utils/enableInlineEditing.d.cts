import { FieldDataType, VisualBuilderEditContext } from './types/index.types.cjs';
import '../../cms/types/contentTypeSchema.types.cjs';

declare function enableInlineEditing({ expectedFieldData, editableElement, fieldType, elements, }: {
    expectedFieldData: any;
    editableElement: HTMLElement;
    fieldType: FieldDataType;
    elements: VisualBuilderEditContext;
}): void;

export { enableInlineEditing };
