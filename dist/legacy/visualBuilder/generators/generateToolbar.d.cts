import { VisualBuilderCslpEventDetails } from '../types/visualBuilder.types.cjs';
import '../../cslp/types/cslp.types.cjs';

declare function appendFocusedToolbar(eventDetails: VisualBuilderCslpEventDetails, focusedToolbarElement: HTMLDivElement, hideOverlay: () => void): void;
declare function appendFieldToolbar(eventDetails: VisualBuilderCslpEventDetails, focusedToolbarElement: HTMLDivElement, hideOverlay: () => void): void;
declare function appendFieldPathDropdown(eventDetails: VisualBuilderCslpEventDetails, focusedToolbarElement: HTMLDivElement): void;

export { appendFieldPathDropdown, appendFieldToolbar, appendFocusedToolbar };
