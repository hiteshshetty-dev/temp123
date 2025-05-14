import { FieldDataType, VisualBuilderEditContext } from './types/index.types.js';
import '../../cms/types/contentTypeSchema.types.js';

declare function enableInlineEditing({ expectedFieldData, editableElement, fieldType, elements, }: {
    expectedFieldData: any;
    editableElement: HTMLElement;
    fieldType: FieldDataType;
    elements: VisualBuilderEditContext;
}): void;

export { enableInlineEditing };
