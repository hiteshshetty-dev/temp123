import EventListenerHandlerParams from './types.cjs';
import { HandleBuilderInteractionParams } from './mouseClick.cjs';
import '../types/visualBuilder.types.cjs';
import '../../cslp/types/cslp.types.cjs';

interface HandleMouseHoverParams extends Pick<EventListenerHandlerParams, "event" | "overlayWrapper" | "visualBuilderContainer" | "focusedToolbar" | "resizeObserver"> {
    customCursor: HTMLDivElement | null;
}
declare function hideHoverOutline(visualBuilderContainer: HTMLDivElement | null): void;
declare function hideCustomCursor(customCursor: HTMLDivElement | null): void;
declare function showCustomCursor(customCursor: HTMLDivElement | null): void;
declare const showHoverToolbar: (params: HandleBuilderInteractionParams) => Promise<void | undefined>;
declare const handleMouseHover: (params: HandleMouseHoverParams) => Promise<void>;

export { type HandleMouseHoverParams, handleMouseHover as default, hideCustomCursor, hideHoverOutline, showCustomCursor, showHoverToolbar };
