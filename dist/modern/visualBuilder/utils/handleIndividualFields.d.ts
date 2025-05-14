import { VisualBuilderCslpEventDetails } from '../types/visualBuilder.types.js';
import { VisualBuilderEditContext } from './types/index.types.js';
import '../../cslp/types/cslp.types.js';
import '../../cms/types/contentTypeSchema.types.js';

/**
 * It handles all the fields based on their data type and its "multiple" property.
 * @param eventDetails The event details object that contain cslp and field metadata.
 * @param elements The elements object that contain the visual builder wrapper.
 */
declare function handleIndividualFields(eventDetails: VisualBuilderCslpEventDetails, elements: VisualBuilderEditContext): Promise<void>;
declare function cleanIndividualFieldResidual(elements: {
    overlayWrapper: HTMLDivElement;
    visualBuilderContainer: HTMLDivElement | null;
    focusedToolbar: HTMLDivElement | null;
    resizeObserver: ResizeObserver;
}): void;

export { cleanIndividualFieldResidual, handleIndividualFields };
