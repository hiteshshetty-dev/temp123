import { FieldDataType, VisualBuilderEditContext } from './types/index.types.cjs';
import '../../cms/types/contentTypeSchema.types.cjs';

/**
 * Handles inline editing for supported fields.
 */
declare function handleInlineEditableField({ fieldType, fieldSchema, fieldMetadata, expectedFieldData, editableElement, elements, }: {
    fieldType: FieldDataType;
    fieldSchema: any;
    fieldMetadata: any;
    expectedFieldData: any;
    editableElement: HTMLElement;
    elements: VisualBuilderEditContext;
}): void;

export { handleInlineEditableField };
