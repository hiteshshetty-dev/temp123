import "../../../chunk-5WRI5ZAA.js";

// src/visualBuilder/hooks/use-infinite-scroll/useInfiniteScroll.ts
import { useEffect, useState } from "preact/hooks";
var scrollOffset = 3;
var useInfiniteScroll = ({
  containerId,
  isFetching,
  canFetchMore,
  loadMore,
  offset,
  limit
}) => {
  const [fetchingState, setFetchingState] = useState(isFetching);
  useEffect(() => {
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
export {
  useInfiniteScroll_default as default
};
//# sourceMappingURL=useInfiniteScroll.js.map