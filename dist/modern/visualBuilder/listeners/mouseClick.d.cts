import EventListenerHandlerParams from './types.cjs';
import '../types/visualBuilder.types.cjs';
import '../../cslp/types/cslp.types.cjs';

type HandleBuilderInteractionParams = Omit<EventListenerHandlerParams, "eventDetails" | "customCursor">;
type AddFocusedToolbarParams = Pick<EventListenerHandlerParams, "eventDetails" | "focusedToolbar"> & {
    hideOverlay: () => void;
};
declare function addFocusedToolbar(params: AddFocusedToolbarParams): void;
declare function handleBuilderInteraction(params: HandleBuilderInteractionParams): Promise<void>;

export { addFocusedToolbar, handleBuilderInteraction as default };
