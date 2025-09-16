import EventListenerHandlerParams from "./types";
import { HandleBuilderInteractionParams } from "./mouseClick";
export interface HandleMouseHoverParams extends Pick<EventListenerHandlerParams, "event" | "overlayWrapper" | "visualBuilderContainer" | "focusedToolbar" | "resizeObserver"> {
    customCursor: HTMLDivElement | null;
}
export declare function hideHoverOutline(visualBuilderContainer: HTMLDivElement | null): void;
export declare function hideCustomCursor(customCursor: HTMLDivElement | null): void;
export declare function showCustomCursor(customCursor: HTMLDivElement | null): void;
export declare const showHoverToolbar: (params: HandleBuilderInteractionParams) => Promise<void | undefined>;
declare const handleMouseHover: (params: HandleMouseHoverParams) => Promise<void>;
export default handleMouseHover;
//# sourceMappingURL=mouseHover.d.ts.map