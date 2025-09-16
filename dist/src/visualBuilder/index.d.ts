import { Signal } from "@preact/signals";
interface VisualBuilderGlobalStateImpl {
    previousSelectedEditableDOM: HTMLElement | Element | null;
    previousHoveredTargetDOM: Element | null;
    previousEmptyBlockParents: Element[] | [];
    focusFieldValue: string | null;
    focusFieldReceivedInput: boolean;
    audienceMode: boolean;
    locale: string;
    variant: string | null;
    focusElementObserver: MutationObserver | null;
    referenceParentMap: Record<string, string>;
    isFocussed: boolean;
}
export declare class VisualBuilder {
    private customCursor;
    private overlayWrapper;
    private visualBuilderContainer;
    private focusedToolbar;
    static VisualBuilderGlobalState: Signal<VisualBuilderGlobalStateImpl>;
    private handlePositionChange;
    private scrollEventHandler;
    private resizeEventHandler;
    private resizeObserver;
    private mutationObserver;
    private threadMutationObserver;
    constructor();
    destroy: () => void;
}
export {};
//# sourceMappingURL=index.d.ts.map