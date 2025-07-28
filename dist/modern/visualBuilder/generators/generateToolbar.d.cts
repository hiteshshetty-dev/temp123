import { VisualBuilderCslpEventDetails } from '../types/visualBuilder.types.cjs';
import '../../cslp/types/cslp.types.cjs';

declare function appendFocusedToolbar(eventDetails: VisualBuilderCslpEventDetails, focusedToolbarElement: HTMLDivElement, hideOverlay: () => void, isVariant?: boolean): void;
declare function appendFieldToolbar(eventDetails: VisualBuilderCslpEventDetails, focusedToolbarElement: HTMLDivElement, hideOverlay: () => void, isVariant?: boolean): Promise<void>;
declare function appendFieldPathDropdown(eventDetails: VisualBuilderCslpEventDetails, focusedToolbarElement: HTMLDivElement): void;

export { appendFieldPathDropdown, appendFieldToolbar, appendFocusedToolbar };
