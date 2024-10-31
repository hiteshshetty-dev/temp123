import { VisualBuilderCslpEventDetails } from '../types/visualBuilder.types.cjs';
import { ISchemaFieldMap } from './types/index.types.cjs';
import '../../cslp/types/cslp.types.cjs';
import '../../cms/types/contentTypeSchema.types.cjs';

/**
 * The function that handles the add instance buttons for multiple fields.
 * @param eventDetails The details containing the field metadata and cslp value.
 * @param elements The elements object that contain the editable element and visual builder wrapper.
 * @param config The configuration object that contains the expected field data and disabled state.
 * @returns void
 */
declare function handleAddButtonsForMultiple(eventDetails: VisualBuilderCslpEventDetails, elements: {
    editableElement: Element | null;
    visualBuilderContainer: HTMLDivElement | null;
    resizeObserver: ResizeObserver;
}, config: {
    fieldSchema: ISchemaFieldMap;
    /**
     * expectedFieldData is the value of the whole multiple field (an array)
     */
    expectedFieldData: any;
    disabled: boolean;
    label: string | undefined;
}): void;
declare function removeAddInstanceButtons(elements: {
    visualBuilderContainer: HTMLDivElement | null;
    overlayWrapper: HTMLDivElement | null;
    eventTarget: EventTarget | null;
}, forceRemoveAll?: boolean): void;
/**
 * This function that observes the parent element and focuses the newly added instance.
 *
 * @param parentCslp The parent cslp value.
 * @param index The index of the new instance.
 * @returns void
 *
 * We can evolve the retry logic, as different use cases arise.
 * Currently, if the new element is not found after the first mutation, we until
 * WAIT_FOR_NEW_INSTANCE_TIMEOUT, expecting that the new instance/block will be
 * found in later mutations and we can focus + disconnect then.
 * We also ensure there is only one setTimeout scheduled.
 */
declare function observeParentAndFocusNewInstance({ parentCslp, index, }: {
    parentCslp: string;
    index: number;
}): void;

export { handleAddButtonsForMultiple, observeParentAndFocusNewInstance, removeAddInstanceButtons };
