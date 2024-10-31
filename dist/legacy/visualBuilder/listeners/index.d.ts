import EventListenerHandlerParams from './types.js';
import '../types/visualBuilder.types.js';
import '../../cslp/types/cslp.types.js';

type AddEventListenersParams = Omit<EventListenerHandlerParams, "event" | "eventDetails">;
type RemoveEventListenersParams = Omit<EventListenerHandlerParams, "event" | "eventDetails">;
declare function addEventListeners(params: AddEventListenersParams): void;
declare function removeEventListeners(params: RemoveEventListenersParams): void;

export { addEventListeners, removeEventListeners };
