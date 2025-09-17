import EventListenerHandlerParams from './types.cjs';
import '../types/visualBuilder.types.cjs';
import '../../cslp/types/cslp.types.cjs';

type AddKeyboardShortcutsParams = Omit<EventListenerHandlerParams, "event" | "eventDetails" | "customCursor" | "previousSelectedEditableDOM">;
declare function addKeyboardShortcuts({ overlayWrapper, visualBuilderContainer, focusedToolbar, resizeObserver, }: AddKeyboardShortcutsParams): void;

export { addKeyboardShortcuts };
