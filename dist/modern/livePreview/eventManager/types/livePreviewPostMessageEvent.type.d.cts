import { ILivePreviewWindowType } from '../../../types/types.cjs';
import '../../../visualBuilder/types/collab.types.cjs';

declare const OnChangeLivePreviewPostMessageEventTypes: {
    readonly HASH_CHANGE: "hash-change";
    readonly URL_CHANGE: "url-change";
};
interface HistoryLivePreviewPostMessageEventData {
    type: "forward" | "backward" | "reload";
}
interface OnChangeLivePreviewPostMessageEventData {
    hash: string;
    entry_uid?: string;
    content_type_uid?: string;
    _metadata?: {
        event_type: typeof OnChangeLivePreviewPostMessageEventTypes[keyof typeof OnChangeLivePreviewPostMessageEventTypes];
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

export { type HistoryLivePreviewPostMessageEventData, type LivePreviewInitEventResponse, type OnChangeLivePreviewPostMessageEventData, OnChangeLivePreviewPostMessageEventTypes, type OnHashChangeLivePreviewPostMessageEventData, type OnReloadLivePreviewPostMessageEventData };
