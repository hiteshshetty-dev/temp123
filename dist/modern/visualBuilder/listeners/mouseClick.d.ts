import EventListenerHandlerParams from './types.js';
import '../types/visualBuilder.types.js';
import '../../cslp/types/cslp.types.js';

type HandleBuilderInteractionParams = Omit<EventListenerHandlerParams, "eventDetails" | "customCursor"> & {
    reEvaluate?: boolean;
};
type AddFocusedToolbarParams = Pick<EventListenerHandlerParams, "eventDetails" | "focusedToolbar"> & {
    hideOverlay: () => void;
    isVariant: boolean;
};
declare function addFocusedToolbar(params: AddFocusedToolbarParams): void;
declare function handleBuilderInteraction(params: HandleBuilderInteractionParams): Promise<void>;

export { addFocusedToolbar, handleBuilderInteraction as default };
