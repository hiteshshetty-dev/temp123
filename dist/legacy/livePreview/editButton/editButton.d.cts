import { IEditButtonPosition } from '../../types/types.cjs';

declare const createSingularEditButton: (editCallback: (e: MouseEvent) => void) => HTMLDivElement;
declare const createMultipleEditButton: (editCallback: (e: MouseEvent) => void, linkCallback: (e: MouseEvent) => void) => HTMLDivElement;
declare function getEditButtonPosition(currentHoveredElement: HTMLElement | null, defaultPosition: string | undefined): IEditButtonPosition;
declare function shouldRenderEditButton(): boolean;
declare function toggleEditButtonElement(): void;
declare function doesEditButtonExist(): boolean;
declare class LivePreviewEditButton {
    private tooltip;
    private typeOfCurrentChild;
    private tooltipChild;
    static livePreviewEditButton: LivePreviewEditButton | null;
    constructor();
    private createCslpTooltip;
    private updateTooltipPosition;
    private addEditStyleOnHover;
    private scrollHandler;
    /**
     * Generates the redirect URL for editing a specific entry in the Live Preview SDK.
     * @param content_type_uid - The UID of the content type.
     * @param locale - The locale of the entry (default: "en-us").
     * @param entry_uid - The UID of the entry.
     * @param preview_field - The field to be previewed.
     * @returns The redirect URL for editing the entry.
     */
    private generateRedirectUrl;
    private linkClickHandler;
    /**
     * Destroys the edit button by removing event listeners and removing the tooltip.
     */
    destroy(): void;
}

export { LivePreviewEditButton, createMultipleEditButton, createSingularEditButton, doesEditButtonExist, getEditButtonPosition, shouldRenderEditButton, toggleEditButtonElement };
