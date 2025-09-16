import EventListenerHandlerParams from "./types";
type AddEventListenersParams = Omit<EventListenerHandlerParams, "event" | "eventDetails">;
type RemoveEventListenersParams = Omit<EventListenerHandlerParams, "event" | "eventDetails">;
export declare function addEventListeners(params: AddEventListenersParams): void;
export declare function removeEventListeners(params: RemoveEventListenersParams): void;
export {};
//# sourceMappingURL=index.d.ts.map