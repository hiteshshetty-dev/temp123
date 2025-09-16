import EventListenerHandlerParams from './types.js';
import '../types/visualBuilder.types.js';
import '../../cslp/types/cslp.types.js';

type AddKeyboardShortcutsParams = Omit<EventListenerHandlerParams, "event" | "eventDetails" | "customCursor" | "previousSelectedEditableDOM">;
declare function addKeyboardShortcuts({ overlayWrapper, visualBuilderContainer, focusedToolbar, resizeObserver, }: AddKeyboardShortcutsParams): void;

export { addKeyboardShortcuts };
