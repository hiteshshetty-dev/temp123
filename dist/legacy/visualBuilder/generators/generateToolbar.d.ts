import { VisualBuilderCslpEventDetails } from '../types/visualBuilder.types.js';
import '../../cslp/types/cslp.types.js';

declare function appendFocusedToolbar(eventDetails: VisualBuilderCslpEventDetails, focusedToolbarElement: HTMLDivElement, hideOverlay: () => void, isVariant?: boolean, options?: {
    isHover?: boolean;
}): void;
declare function appendFieldToolbar(eventDetails: VisualBuilderCslpEventDetails, focusedToolbarElement: HTMLDivElement, hideOverlay: () => void, isVariant?: boolean, options?: {
    isHover?: boolean;
}): Promise<void>;
declare function appendFieldPathDropdown(eventDetails: VisualBuilderCslpEventDetails, focusedToolbarElement: HTMLDivElement, options?: {
    isHover?: boolean;
}): void;
declare function removeFieldToolbar(toolbar: Element): void;

export { appendFieldPathDropdown, appendFieldToolbar, appendFocusedToolbar, removeFieldToolbar };
