import EventListenerHandlerParams from './types.cjs';
import '../types/visualBuilder.types.cjs';
import '../../cslp/types/cslp.types.cjs';

type AddEventListenersParams = Omit<EventListenerHandlerParams, "event" | "eventDetails">;
type RemoveEventListenersParams = Omit<EventListenerHandlerParams, "event" | "eventDetails">;
declare function addEventListeners(params: AddEventListenersParams): void;
declare function removeEventListeners(params: RemoveEventListenersParams): void;

export { addEventListeners, removeEventListeners };
