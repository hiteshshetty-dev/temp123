import { IHighlightCommentData } from "../eventManager/useHighlightCommentIcon";
export declare function highlightCommentIconOnCanvas(payload: IHighlightCommentData[]): void;
/**
 * Update Highlighted comment position , whenever scroll or resize happen.
 */
export declare function updateHighlightedCommentIconPosition(): void;
/**
 * Removes the first highlighted comment icon based on an array of paths.
 *
 * @param pathsToRemove - Array of field-paths to remove.
 */
export declare function removeHighlightedCommentIcon(pathToRemove: string): void;
export declare function removeAllHighlightedCommentIcons(): void;
/**
 * Toggle display style of a specific highlighted comment icon.
 *
 * @param path - The data-cslp attribute of the element whose corresponding highlighted comment icon should be toggled.
 * @param shouldShow - Boolean value to determine whether to show or hide the icon.
 * If true, the icon will be displayed. If false, the icon will be hidden.
 */
export declare function toggleHighlightedCommentIconDisplay(path: string, shouldShow: boolean): void;
/**
 * Show all .highlighted-comment icons that have the hiddenClass applied.
 */
export declare function showAllHiddenHighlightedCommentIcons(): void;
//# sourceMappingURL=generateHighlightedComment.d.ts.map