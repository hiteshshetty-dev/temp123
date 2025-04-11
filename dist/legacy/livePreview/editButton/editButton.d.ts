import { IEditButtonPosition } from '../../types/types.js';
import '../../visualBuilder/types/collab.types.js';

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
    private shouldUpdateStyle;
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
/**
 * Find first element with cslp on the event composed path,
 * do safe zone calculation for the element based on its
 * width and height, and return true if mouse pointer is
 * within the safe zone. Returns undefined when this cannot
 * be determined.
 */
declare function isPointerWithinEditButtonSafeZone({ event, editButtonDomRect, editButtonPos, }: {
    event: MouseEvent;
    editButtonDomRect: DOMRect | undefined;
    editButtonPos: string | undefined;
}): boolean | undefined;

export { LivePreviewEditButton, createMultipleEditButton, createSingularEditButton, doesEditButtonExist, getEditButtonPosition, isPointerWithinEditButtonSafeZone, shouldRenderEditButton, toggleEditButtonElement };
