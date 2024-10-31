import { ISchemaFieldMap } from '../utils/types/index.types.cjs';
import '../../cms/types/contentTypeSchema.types.cjs';

/**
 * Generates a button element, when clicked, triggers the provided callback function.
 * @param onClickCallback - The function to be called when the button is clicked.
 * @returns The generated button element.
 */
declare function generateAddInstanceButton({ fieldSchema, value, onClick, label, }: {
    value: any;
    onClick: (event: MouseEvent) => void;
    label?: string | undefined;
    fieldSchema: ISchemaFieldMap | undefined;
}): HTMLButtonElement;
/**
 * Returns an array of HTMLButtonElement instances that can be used to add new instances to the visual builder.
 * @param visualBuilderContainer - The HTMLDivElement that contains the visual builder.
 * @param getAllButtons - If true, returns all add instance buttons. If false, returns only the previous and next buttons.
 * @returns An array of HTMLButtonElement instances or null if there are less than 2 buttons.
 */
declare function getAddInstanceButtons(visualBuilderContainer: HTMLDivElement, getAllButtons?: boolean): HTMLButtonElement[] | [HTMLButtonElement, HTMLButtonElement] | null;

export { generateAddInstanceButton, getAddInstanceButtons };
