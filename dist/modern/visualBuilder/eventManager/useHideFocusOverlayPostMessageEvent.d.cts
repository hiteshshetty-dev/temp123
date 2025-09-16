import EventListenerHandlerParams from '../listeners/types.cjs';
import '../types/visualBuilder.types.cjs';
import '../../cslp/types/cslp.types.cjs';

type HideFocusOverlayEventHandlerParams = Omit<EventListenerHandlerParams, "event" | "eventDetails" | "customCursor" | "previousSelectedEditableDOM">;
declare function useHideFocusOverlayPostMessageEvent({ visualBuilderContainer, overlayWrapper, focusedToolbar, resizeObserver, }: HideFocusOverlayEventHandlerParams): void;

export { useHideFocusOverlayPostMessageEvent };
