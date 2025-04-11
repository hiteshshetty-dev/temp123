"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/visualBuilder/hooks/use-infinite-scroll/useInfiniteScroll.ts
var useInfiniteScroll_exports = {};
__export(useInfiniteScroll_exports, {
  default: () => useInfiniteScroll_default
});
module.exports = __toCommonJS(useInfiniteScroll_exports);
var import_hooks = require("preact/hooks");
var scrollOffset = 3;
var useInfiniteScroll = ({
  containerId,
  isFetching,
  canFetchMore,
  loadMore,
  offset,
  limit
}) => {
  const [fetchingState, setFetchingState] = (0, import_hooks.useState)(isFetching);
  (0, import_hooks.useEffect)(() => {
    const commentListContainer = document.getElementById(containerId);
    if (!commentListContainer) return;
    const scrollEvent = async () => {
      if (commentListContainer.scrollHeight + commentListContainer.scrollTop - commentListContainer.clientHeight < scrollOffset && // Adjust this offset if needed
      !fetchingState && canFetchMore) {
        setFetchingState(true);
        try {
          await loadMore(offset, limit);
        } finally {
          setFetchingState(false);
        }
      }
    };
    commentListContainer.addEventListener("scroll", scrollEvent, true);
    return () => {
      commentListContainer.removeEventListener(
        "scroll",
        scrollEvent,
        true
      );
    };
  }, [containerId, fetchingState, canFetchMore, loadMore, offset, limit]);
  return fetchingState;
};
var useInfiniteScroll_default = useInfiniteScroll;
//# sourceMappingURL=useInfiniteScroll.cjs.map