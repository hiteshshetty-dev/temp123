import { VisualBuilderPostMessageEvents } from "../utils/types/postMessage.types";
import EventListenerHandlerParams from "../listeners/types";
/**
 * Adds a focus overlay to the target element.
 * @param targetElement - The element to add the focus overlay to.
 * @param focusOverlayWrapper - The HTMLDivElement that contains the focus overlay.
 * @returns void
 */
export declare function addFocusOverlay(targetElement: Element, focusOverlayWrapper: HTMLDivElement, disabled?: boolean): void;
/**
 * Hides the focus overlay and performs necessary cleanup actions when the user clicks outside of the focused element.
 * @param event - The mouse event that triggered the function.
 * @param elements - An object containing references to the focus overlay wrapper, the previously selected editable DOM element, and the visual builder wrapper.
 */
export declare function hideFocusOverlay(elements: HideOverlayParams): void;
interface ISendFieldEventParams {
    visualBuilderContainer: HTMLElement | null;
    eventType: VisualBuilderPostMessageEvents.UPDATE_FIELD | VisualBuilderPostMessageEvents.SYNC_FIELD;
}
export declare function sendFieldEvent(options: ISendFieldEventParams): void;
interface HideOverlayParams extends Pick<EventListenerHandlerParams, "visualBuilderContainer" | "focusedToolbar" | "resizeObserver"> {
    visualBuilderOverlayWrapper: HTMLDivElement | null;
    noTrigger?: boolean;
}
export declare function hideOverlay(params: HideOverlayParams): void;
export {};
//# sourceMappingURL=generateOverlay.d.ts.map