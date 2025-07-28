import { VisualBuilderCslpEventDetails } from '../types/visualBuilder.types.js';
import '../../cslp/types/cslp.types.js';

declare function appendFocusedToolbar(eventDetails: VisualBuilderCslpEventDetails, focusedToolbarElement: HTMLDivElement, hideOverlay: () => void, isVariant?: boolean): void;
declare function appendFieldToolbar(eventDetails: VisualBuilderCslpEventDetails, focusedToolbarElement: HTMLDivElement, hideOverlay: () => void, isVariant?: boolean): Promise<void>;
declare function appendFieldPathDropdown(eventDetails: VisualBuilderCslpEventDetails, focusedToolbarElement: HTMLDivElement): void;

export { appendFieldPathDropdown, appendFieldToolbar, appendFocusedToolbar };
