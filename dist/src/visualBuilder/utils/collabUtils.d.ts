import { ICommentState, IMentionedList, IMentionItem, IMessageDTO, IUserDTO, IUserState } from "../types/collab.types";
/**
 * Generates the title for the thread based on the number of comments.
 * @param {number} commentCount - The number of comments.
 * @returns {string} The title for the thread.
 */
export declare const getThreadTitle: (commentCount: number) => string;
/**
 * returns the available email.
 * @param {IUserDTO} user - The user object.
 * @returns {string} The user's email.
 */
export declare const getUserName: (user: IUserDTO) => string;
/**
 * Validates the comment length and the number of mentions.
 * @param {string} comment - The comment message.
 * @param {IMentionedList} toUsers - The list of mentioned users.
 * @returns {string} The error message if validation fails, otherwise an empty string.
 */
export declare const validateCommentAndMentions: (comment: string, toUsers: IMentionedList) => string;
/**
 * Removes mentions that no longer exist in the message.
 * @param {string} message - The comment message.
 * @param {IMentionedList} toUsers - The list of mentioned users.
 * @returns {Object} The updated lists of mentioned users.
 */
export declare const filterOutInvalidMentions: (message: string, toUsers: IMentionedList) => {
    toUsers: IMentionItem[];
};
/**
 * Replaces mention placeholders with display names in the comment message.
 * @param {IMessageDTO | undefined} comment - The comment object.
 * @param {IUserState} userState - The user state containing user and role maps.
 * @param {"text" | "html"} profile - The format for the output message, either plain text or HTML.
 * @returns {string | undefined} The formatted message or undefined if the comment is not provided.
 */
export declare const getMessageWithDisplayName: (comment: IMessageDTO | undefined | null, userState: IUserState, profile: "text" | "html") => string | undefined;
/**
 * Sanitizes HTML content to prevent XSS attacks.
 * @param {any} dirty - The unsanitized HTML content.
 * @returns {string} The sanitized HTML content.
 */
export declare const sanitizeData: (dirty: any) => string;
/**
 * Constructs the comment body with mentions replaced by their unique identifiers.
 * @param {ICommentState} state - The state containing the comment and mentions.
 * @returns {Object} The comment body containing the sanitized message and mentioned users.
 */
export declare const getCommentBody: (state: ICommentState) => ICommentState;
export declare function normalizePath(path: string): string;
export declare function fixSvgXPath(xpath: string | null): string;
/**
 * populate the position of the thread based on edges of the screen.
 * @param position
 * @param options
 * @returns
 */
export declare function adjustPositionToViewport(position: {
    top: number;
    left: number;
}, options?: {
    threadWidth?: number;
    safeMargin?: number;
    topSafeMargin?: number;
}): {
    top: number;
    left: number;
};
export declare function formatDate(dateString: string): string;
/**
 * Calculates and updates tooltip position based on available viewport space.
 */
export declare const positionTooltip: (tooltipRef: React.RefObject<HTMLDivElement>, targetRef: React.RefObject<HTMLDivElement>, position: "top" | "bottom" | "left" | "right", setActualPosition: (position: "top" | "bottom" | "left" | "right") => void) => void;
//# sourceMappingURL=collabUtils.d.ts.map