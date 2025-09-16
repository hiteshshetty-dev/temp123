import { OnEntryChangeCallbackUID, OnEntryChangeCallback } from "./types/onEntryChangeCallback.type";
export declare function removeFromOnChangeSubscribers(callbackStack: {
    [callbackUid: OnEntryChangeCallbackUID]: OnEntryChangeCallback;
}, callback: OnEntryChangeCallbackUID | OnEntryChangeCallback): void;
//# sourceMappingURL=removeFromOnChangeSubscribers.d.ts.map