import EventListenerHandlerParams from './types.js';
import '../types/visualBuilder.types.js';
import '../../cslp/types/cslp.types.js';

type HandleBuilderInteractionParams = Omit<EventListenerHandlerParams, "eventDetails" | "customCursor">;
type AddFocusedToolbarParams = Pick<EventListenerHandlerParams, "eventDetails" | "focusedToolbar">;
declare function addFocusedToolbar(params: AddFocusedToolbarParams): void;
declare function handleBuilderInteraction(params: HandleBuilderInteractionParams): Promise<void>;

export { addFocusedToolbar, handleBuilderInteraction as default };
