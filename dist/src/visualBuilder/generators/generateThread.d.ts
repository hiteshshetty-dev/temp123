import { IThreadDTO, IThreadRenderStatus } from "../types/collab.types";
import { MissingThreadsInfo, toggleCollabPopupEvent } from "../types/collab.types";
export declare function generateThread(payload: IThreadDTO | any, options?: {
    isNewThread?: boolean;
    updateConfig?: boolean;
    hidden?: boolean;
}): string | undefined;
export declare function updateCollabIconPosition(): void;
export declare function updatePopupPositions(): void;
export declare function updateSuggestionListPosition(): void;
export declare function calculatePopupPosition(button: HTMLElement, popup: HTMLElement): void;
export declare function removeAllCollabIcons(): void;
export declare function hideAllCollabIcons(): void;
export declare function showAllCollabIcons(): void;
export declare function removeCollabIcon(threadUid: string): void;
export declare function toggleCollabPopup({ threadUid, action, }: toggleCollabPopupEvent): void;
export declare function HighlightThread(threadUid: string): void;
export declare function isCollabThread(target: HTMLElement): boolean;
export declare function handleMissingThreads(payload: MissingThreadsInfo): void;
export declare function handleEmptyThreads(): void;
export declare const threadRenderStatus: Map<string, IThreadRenderStatus>;
export declare function clearThreadStatus(threadId: string): void;
export declare function clearAllThreadStatus(): void;
export declare function processThreadsBatch(threads: IThreadDTO[]): Promise<string[]>;
export declare function filterUnrenderedThreads(threads: IThreadDTO[]): IThreadDTO[];
//# sourceMappingURL=generateThread.d.ts.map