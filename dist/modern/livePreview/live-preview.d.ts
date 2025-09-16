import { OnEntryChangeCallback, OnEntryChangeCallbackUID, OnEntryChangeUnsubscribeParameters } from './types/onEntryChangeCallback.type.js';

declare class LivePreview {
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

export { LivePreview as default };
