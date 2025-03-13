import { ILivePreviewWindowType } from '../../../types/types.js';
import '../../../visualBuilder/types/collab.types.js';

interface HistoryLivePreviewPostMessageEventData {
    type: "forward" | "backward" | "reload";
}
interface OnChangeLivePreviewPostMessageEventData {
    hash: string;
}
interface LivePreviewInitEventResponse {
    contentTypeUid: string;
    entryUid: string;
    windowType: ILivePreviewWindowType;
}

export type { HistoryLivePreviewPostMessageEventData, LivePreviewInitEventResponse, OnChangeLivePreviewPostMessageEventData };
