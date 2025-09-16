import { VisualBuilderCslpEventDetails } from "../types/visualBuilder.types";
export declare function appendFocusedToolbar(eventDetails: VisualBuilderCslpEventDetails, focusedToolbarElement: HTMLDivElement, hideOverlay: () => void, isVariant?: boolean, options?: {
    isHover?: boolean;
}): void;
export declare function appendFieldToolbar(eventDetails: VisualBuilderCslpEventDetails, focusedToolbarElement: HTMLDivElement, hideOverlay: () => void, isVariant?: boolean, options?: {
    isHover?: boolean;
}): Promise<void>;
export declare function appendFieldPathDropdown(eventDetails: VisualBuilderCslpEventDetails, focusedToolbarElement: HTMLDivElement, options?: {
    isHover?: boolean;
}): void;
export declare function removeFieldToolbar(toolbar: Element): void;
//# sourceMappingURL=generateToolbar.d.ts.map