import { ILivePreviewWindowType } from '../../../types/types.js';
import '../../../visualBuilder/types/collab.types.js';

declare const OnChangeLivePreviewPostMessageEventTypes: {
    readonly HASH_CHANGE: "hash_change";
    readonly URL_CHANGE: "url_change";
};
interface HistoryLivePreviewPostMessageEventData {
    type: "forward" | "backward" | "reload";
}
interface OnChangeLivePreviewPostMessageEventData {
    hash: string;
    entry_uid?: string;
    content_type_uid?: string;
    url?: string;
    _metadata?: {
        event_type: typeof OnChangeLivePreviewPostMessageEventTypes[keyof typeof OnChangeLivePreviewPostMessageEventTypes];
    };
}
interface LivePreviewInitEventResponse {
    contentTypeUid: string;
    entryUid: string;
    windowType: ILivePreviewWindowType;
}

export { type HistoryLivePreviewPostMessageEventData, type LivePreviewInitEventResponse, type OnChangeLivePreviewPostMessageEventData, OnChangeLivePreviewPostMessageEventTypes };
