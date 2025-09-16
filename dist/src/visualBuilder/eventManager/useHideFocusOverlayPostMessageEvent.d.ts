import EventListenerHandlerParams from "../listeners/types";
type HideFocusOverlayEventHandlerParams = Omit<EventListenerHandlerParams, "event" | "eventDetails" | "customCursor" | "previousSelectedEditableDOM">;
export declare function useHideFocusOverlayPostMessageEvent({ visualBuilderContainer, overlayWrapper, focusedToolbar, resizeObserver, }: HideFocusOverlayEventHandlerParams): void;
export {};
//# sourceMappingURL=useHideFocusOverlayPostMessageEvent.d.ts.map