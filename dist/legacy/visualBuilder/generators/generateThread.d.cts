import { IThreadDTO, toggleCollabPopupEvent, MissingThreadsInfo, IThreadRenderStatus } from '../types/collab.types.cjs';

declare function generateThread(payload: IThreadDTO | any, options?: {
    isNewThread?: boolean;
    updateConfig?: boolean;
    hidden?: boolean;
}): string | undefined;
declare function updateCollabIconPosition(): void;
declare function updatePopupPositions(): void;
declare function updateSuggestionListPosition(): void;
declare function calculatePopupPosition(button: HTMLElement, popup: HTMLElement): void;
declare function removeAllCollabIcons(): void;
declare function hideAllCollabIcons(): void;
declare function showAllCollabIcons(): void;
declare function removeCollabIcon(threadUid: string): void;
declare function toggleCollabPopup({ threadUid, action, }: toggleCollabPopupEvent): void;
declare function HighlightThread(threadUid: string): void;
declare function isCollabThread(target: HTMLElement): boolean;
declare function handleMissingThreads(payload: MissingThreadsInfo): void;
declare function handleEmptyThreads(): void;
declare const threadRenderStatus: Map<string, IThreadRenderStatus>;
declare function clearThreadStatus(threadId: string): void;
declare function clearAllThreadStatus(): void;
declare function processThreadsBatch(threads: IThreadDTO[]): Promise<string[]>;
declare function filterUnrenderedThreads(threads: IThreadDTO[]): IThreadDTO[];

export { HighlightThread, calculatePopupPosition, clearAllThreadStatus, clearThreadStatus, filterUnrenderedThreads, generateThread, handleEmptyThreads, handleMissingThreads, hideAllCollabIcons, isCollabThread, processThreadsBatch, removeAllCollabIcons, removeCollabIcon, showAllCollabIcons, threadRenderStatus, toggleCollabPopup, updateCollabIconPosition, updatePopupPositions, updateSuggestionListPosition };
