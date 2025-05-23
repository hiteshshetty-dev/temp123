import { ISchemaFieldMap } from '../utils/types/index.types.cjs';
import { CslpData } from '../../cslp/types/cslp.types.cjs';
import { Signal } from '@preact/signals';
import '../../cms/types/contentTypeSchema.types.cjs';

/**
 * Generates a button element, when clicked, sends the add instance message and
 * then calls the provided callback function.
 * @param onClickCallback - The function to be called when the button is clicked.
 * @returns The generated button element.
 */
declare function generateAddInstanceButton({ value, fieldSchema, fieldMetadata, index, loading, onClick, label, }: {
    fieldSchema: ISchemaFieldMap | undefined;
    value: any;
    fieldMetadata: CslpData;
    index: number;
    loading: Signal<boolean>;
    onClick: (event: MouseEvent) => void;
    label?: string | undefined;
}): HTMLButtonElement;
/**
 * Returns an array of HTMLButtonElement instances that can be used to add new instances to the visual builder.
 * @param visualBuilderContainer - The HTMLDivElement that contains the visual builder.
 * @param getAllButtons - If true, returns all add instance buttons. If false, returns only the previous and next buttons.
 * @returns An array of HTMLButtonElement instances or null if there are less than 2 buttons.
 */
declare function getAddInstanceButtons(visualBuilderContainer: HTMLDivElement, getAllButtons?: boolean): HTMLButtonElement[] | [HTMLButtonElement, HTMLButtonElement] | null;

export { generateAddInstanceButton, getAddInstanceButtons };
