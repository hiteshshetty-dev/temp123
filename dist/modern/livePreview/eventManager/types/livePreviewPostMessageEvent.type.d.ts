import { ILivePreviewWindowType } from '../../../types/types.js';
import '../../../visualBuilder/types/collab.types.js';

interface HistoryLivePreviewPostMessageEventData {
    type: "forward" | "backward" | "reload";
}
interface OnChangeLivePreviewPostMessageEventData {
    hash: string;
    entry_uid?: string;
    content_type_uid?: string;
    _metadata?: {
        event_type: "hash-change" | "entry-change";
    };
}
interface OnReloadLivePreviewPostMessageEventData {
    hash: string;
}
interface OnHashChangeLivePreviewPostMessageEventData {
    hash: string;
}
interface LivePreviewInitEventResponse {
    contentTypeUid: string;
    entryUid: string;
    windowType: ILivePreviewWindowType;
}

export type { HistoryLivePreviewPostMessageEventData, LivePreviewInitEventResponse, OnChangeLivePreviewPostMessageEventData, OnHashChangeLivePreviewPostMessageEventData, OnReloadLivePreviewPostMessageEventData };
