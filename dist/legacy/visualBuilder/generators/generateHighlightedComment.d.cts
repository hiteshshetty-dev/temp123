import { IHighlightCommentData } from '../eventManager/useHighlightCommentIcon.cjs';
import '../../cslp/types/cslp.types.cjs';
import '../utils/types/index.types.cjs';
import '../../cms/types/contentTypeSchema.types.cjs';
import '../components/CommentIcon.cjs';
import 'react/jsx-runtime';

declare function highlightCommentIconOnCanvas(payload: IHighlightCommentData[]): void;
/**
 * Update Highlighted comment position , whenever scroll or resize happen.
 */
declare function updateHighlightedCommentIconPosition(): void;
/**
 * Removes the first highlighted comment icon based on an array of paths.
 *
 * @param pathsToRemove - Array of field-paths to remove.
 */
declare function removeHighlightedCommentIcon(pathToRemove: string): void;
declare function removeAllHighlightedCommentIcons(): void;
/**
 * Toggle display style of a specific highlighted comment icon.
 *
 * @param path - The data-cslp attribute of the element whose corresponding highlighted comment icon should be toggled.
 * @param shouldShow - Boolean value to determine whether to show or hide the icon.
 * If true, the icon will be displayed. If false, the icon will be hidden.
 */
declare function toggleHighlightedCommentIconDisplay(path: string, shouldShow: boolean): void;
/**
 * Show all .highlighted-comment icons that have the hiddenClass applied.
 */
declare function showAllHiddenHighlightedCommentIcons(): void;

export { highlightCommentIconOnCanvas, removeAllHighlightedCommentIcons, removeHighlightedCommentIcon, showAllHiddenHighlightedCommentIcons, toggleHighlightedCommentIconDisplay, updateHighlightedCommentIconPosition };
