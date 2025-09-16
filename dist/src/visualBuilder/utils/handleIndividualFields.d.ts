import { VisualBuilderCslpEventDetails } from "../types/visualBuilder.types";
import { VisualBuilderEditContext } from "./types/index.types";
/**
 * It handles all the fields based on their data type and its "multiple" property.
 * @param eventDetails The event details object that contain cslp and field metadata.
 * @param elements The elements object that contain the visual builder wrapper.
 */
export declare function handleIndividualFields(eventDetails: VisualBuilderCslpEventDetails, elements: VisualBuilderEditContext): Promise<void>;
export declare function cleanIndividualFieldResidual(elements: {
    overlayWrapper: HTMLDivElement;
    visualBuilderContainer: HTMLDivElement | null;
    focusedToolbar: HTMLDivElement | null;
    resizeObserver: ResizeObserver;
}): void;
//# sourceMappingURL=handleIndividualFields.d.ts.map