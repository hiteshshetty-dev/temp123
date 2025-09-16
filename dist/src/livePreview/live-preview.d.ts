import { OnEntryChangeCallback, OnEntryChangeCallbackUID, OnEntryChangeUnsubscribeParameters } from "./types/onEntryChangeCallback.type";
export default class LivePreview {
    /**
     * @hideconstructor
     */
    private subscribers;
    constructor();
    private requestDataSync;
    subscribeToOnEntryChange(callback: OnEntryChangeCallback, callbackUid: OnEntryChangeCallbackUID): string;
    private publish;
    unsubscribeOnEntryChange(callback: OnEntryChangeUnsubscribeParameters): void;
}
//# sourceMappingURL=live-preview.d.ts.map