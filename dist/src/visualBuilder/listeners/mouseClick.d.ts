import EventListenerHandlerParams from "./types";
export type HandleBuilderInteractionParams = Omit<EventListenerHandlerParams, "eventDetails" | "customCursor"> & {
    reEvaluate?: boolean;
};
type AddFocusedToolbarParams = Pick<EventListenerHandlerParams, "eventDetails" | "focusedToolbar"> & {
    hideOverlay: () => void;
    isVariant: boolean;
    options?: {
        isHover?: boolean;
    };
};
export declare function addFocusedToolbar(params: AddFocusedToolbarParams): void;
export declare function handleBuilderInteraction(params: HandleBuilderInteractionParams): Promise<void>;
export default handleBuilderInteraction;
//# sourceMappingURL=mouseClick.d.ts.map