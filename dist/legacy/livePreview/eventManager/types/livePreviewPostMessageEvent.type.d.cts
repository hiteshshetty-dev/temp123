import { ILivePreviewWindowType } from '../../../types/types.cjs';
import '../../../visualBuilder/types/collab.types.cjs';

interface HistoryLivePreviewPostMessageEventData {
    type: "forward" | "backward" | "reload";
}
interface OnChangeLivePreviewPostMessageEventData {
    hash: string;
}
interface OnReloadLivePreviewPostMessageEventData {
    hash: string;
}
interface LivePreviewInitEventResponse {
    contentTypeUid: string;
    entryUid: string;
    windowType: ILivePreviewWindowType;
}

export type { HistoryLivePreviewPostMessageEventData, LivePreviewInitEventResponse, OnChangeLivePreviewPostMessageEventData, OnReloadLivePreviewPostMessageEventData };
