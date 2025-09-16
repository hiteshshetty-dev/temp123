import { VisualBuilderCslpEventDetails } from '../types/visualBuilder.types.js';
import '../../cslp/types/cslp.types.js';

interface EventListenerHandlerParams {
    event: MouseEvent;
    overlayWrapper: HTMLDivElement | null;
    visualBuilderContainer: HTMLDivElement | null;
    previousSelectedEditableDOM: Element | null;
    focusedToolbar: HTMLDivElement | null;
    resizeObserver: ResizeObserver;
    eventDetails: VisualBuilderCslpEventDetails;
    customCursor: HTMLDivElement | null;
}

export type { EventListenerHandlerParams as default };
