import { VisualBuilderCslpEventDetails } from '../types/visualBuilder.types.cjs';
import '../../cslp/types/cslp.types.cjs';

/**
 * It handles all the fields based on their data type and its "multiple" property.
 * @param eventDetails The event details object that contain cslp and field metadata.
 * @param elements The elements object that contain the visual builder wrapper.
 */
declare function handleIndividualFields(eventDetails: VisualBuilderCslpEventDetails, elements: {
    visualBuilderContainer: HTMLDivElement;
    resizeObserver: ResizeObserver;
    lastEditedField: Element | null;
}): Promise<void>;
declare function cleanIndividualFieldResidual(elements: {
    overlayWrapper: HTMLDivElement;
    visualBuilderContainer: HTMLDivElement | null;
    focusedToolbar: HTMLDivElement | null;
    resizeObserver: ResizeObserver;
}): void;

export { cleanIndividualFieldResidual, handleIndividualFields };
