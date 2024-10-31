import { Signal } from '@preact/signals';

interface VisualBuilderGlobalStateImpl {
    previousSelectedEditableDOM: HTMLElement | Element | null;
    previousHoveredTargetDOM: Element | null;
    previousEmptyBlockParents: Element[] | [];
    focusFieldValue: string | null;
    audienceMode: boolean;
    locale: string;
    variant: string | null;
}
declare class VisualBuilder {
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
    constructor();
    destroy: () => void;
}

export { VisualBuilder };
