interface IUseInfiniteScrollOptions {
    containerId: string;
    isFetching: boolean;
    canFetchMore: boolean;
    loadMore: (offset: number, limit: number) => Promise<any>;
    offset: number;
    limit: number;
}
declare const useInfiniteScroll: ({ containerId, isFetching, canFetchMore, loadMore, offset, limit, }: IUseInfiniteScrollOptions) => boolean;
export default useInfiniteScroll;
//# sourceMappingURL=useInfiniteScroll.d.ts.map