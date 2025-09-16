import EventListenerHandlerParams from "./types";
type AddKeyboardShortcutsParams = Omit<EventListenerHandlerParams, "event" | "eventDetails" | "customCursor" | "previousSelectedEditableDOM">;
export declare function addKeyboardShortcuts({ overlayWrapper, visualBuilderContainer, focusedToolbar, resizeObserver, }: AddKeyboardShortcutsParams): void;
export {};
//# sourceMappingURL=keyboardShortcuts.d.ts.map