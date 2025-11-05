import EventListenerHandlerParams from './types.js';
import { HandleBuilderInteractionParams } from './mouseClick.js';
import '../types/visualBuilder.types.js';
import '../../cslp/types/cslp.types.js';

interface HandleMouseHoverParams extends Pick<EventListenerHandlerParams, "event" | "overlayWrapper" | "visualBuilderContainer" | "focusedToolbar" | "resizeObserver"> {
    customCursor: HTMLDivElement | null;
}
declare const cancelPendingAddOutline: () => void;
declare function hideHoverOutline(visualBuilderContainer: HTMLDivElement | null): void;
declare function hideCustomCursor(customCursor: HTMLDivElement | null): void;
declare function showCustomCursor(customCursor: HTMLDivElement | null): void;
declare const showHoverToolbar: (params: HandleBuilderInteractionParams) => Promise<void | undefined>;
declare const cancelPendingHoverToolbar: () => void;
declare const handleMouseHover: (params: HandleMouseHoverParams) => Promise<void>;
declare const cancelPendingMouseHover: () => void;

export { type HandleMouseHoverParams, cancelPendingAddOutline, cancelPendingHoverToolbar, cancelPendingMouseHover, handleMouseHover as default, hideCustomCursor, hideHoverOutline, showCustomCursor, showHoverToolbar };
