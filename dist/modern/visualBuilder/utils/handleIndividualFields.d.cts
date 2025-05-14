import { VisualBuilderCslpEventDetails } from '../types/visualBuilder.types.cjs';
import { VisualBuilderEditContext } from './types/index.types.cjs';
import '../../cslp/types/cslp.types.cjs';
import '../../cms/types/contentTypeSchema.types.cjs';

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
