declare const TIMELINE_CHANNEL_ID = "timeline";
declare const timelinePostMessageEvents: {
    readonly SEND_CURRENT_BASE_ROUTE: "send-current-base-route";
    readonly SEND_CSLP_DATA: "send-cslp-data";
    readonly DIFF_VALUE: "diff-value";
    readonly REMOVE_DIFF: "remove-diff";
};

export { TIMELINE_CHANNEL_ID, timelinePostMessageEvents };
