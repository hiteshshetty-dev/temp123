declare const LIVE_PREVIEW_POST_MESSAGE_EVENTS: {
    readonly INIT: "init";
    readonly ON_CHANGE: "client-data-send";
    readonly HISTORY: "history";
    readonly CHECK_ENTRY_PAGE: "check-entry-page";
    readonly URL_CHANGE: "url-change";
    readonly VARIANT_PATCH: "variant-patch-update";
    readonly ON_RELOAD: "cslp-reload";
};
declare const LIVE_PREVIEW_CHANNEL_ID = "live-preview";

export { LIVE_PREVIEW_CHANNEL_ID, LIVE_PREVIEW_POST_MESSAGE_EVENTS };
