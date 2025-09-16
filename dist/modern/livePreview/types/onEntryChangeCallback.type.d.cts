declare type OnEntryChangeCallback = () => void;
declare type OnEntryChangeConfig = {
    skipInitialRender?: boolean;
};
declare type OnEntryChangeCallbackUID = string;
type OnEntryChangeCallbackSubscribers = Record<OnEntryChangeCallbackUID, OnEntryChangeCallback>;
type OnEntryChangeUnsubscribeParameters = OnEntryChangeCallbackUID | OnEntryChangeCallback;

export type { OnEntryChangeCallback, OnEntryChangeCallbackSubscribers, OnEntryChangeCallbackUID, OnEntryChangeConfig, OnEntryChangeUnsubscribeParameters };
