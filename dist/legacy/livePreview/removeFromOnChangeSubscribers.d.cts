import { OnEntryChangeCallback, OnEntryChangeCallbackUID } from './types/onEntryChangeCallback.type.cjs';

declare function removeFromOnChangeSubscribers(callbackStack: {
    [callbackUid: OnEntryChangeCallbackUID]: OnEntryChangeCallback;
}, callback: OnEntryChangeCallbackUID | OnEntryChangeCallback): void;

export { removeFromOnChangeSubscribers };
