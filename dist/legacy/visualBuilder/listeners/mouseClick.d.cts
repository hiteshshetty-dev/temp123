import EventListenerHandlerParams from './types.cjs';
import '../types/visualBuilder.types.cjs';
import '../../cslp/types/cslp.types.cjs';

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
