/**
 * Registers a post message event listener for history-related events.
 * The listener handles events for forward, backward, and reload actions on the browser history.
 */
declare function useHistoryPostMessageEvent(): void;
/**
 * Registers a post message event listener for updating the entry in the live preview.
 */
declare function useOnEntryUpdatePostMessageEvent(): void;
declare function useOnReloadPostMessageEvent(): void;
declare function sendInitializeLivePreviewPostMessageEvent(): void;

export { sendInitializeLivePreviewPostMessageEvent, useHistoryPostMessageEvent, useOnEntryUpdatePostMessageEvent, useOnReloadPostMessageEvent };
