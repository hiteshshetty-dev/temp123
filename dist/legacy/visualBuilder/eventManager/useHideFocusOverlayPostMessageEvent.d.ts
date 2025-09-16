import EventListenerHandlerParams from '../listeners/types.js';
import '../types/visualBuilder.types.js';
import '../../cslp/types/cslp.types.js';

type HideFocusOverlayEventHandlerParams = Omit<EventListenerHandlerParams, "event" | "eventDetails" | "customCursor" | "previousSelectedEditableDOM">;
declare function useHideFocusOverlayPostMessageEvent({ visualBuilderContainer, overlayWrapper, focusedToolbar, resizeObserver, }: HideFocusOverlayEventHandlerParams): void;

export { useHideFocusOverlayPostMessageEvent };
