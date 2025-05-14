/**
 * Creates a cached async fetch function with support for any number of arguments
 * @param fetchFn - The async function to cache
 * @param uidResolver - Function that generates a unique ID from the arguments passed to fetchFn
 * @returns A cached version of the fetch function with the same signature
 */
declare function createCachedFetch<TArgs extends any[], TResult>(fetchFn: (...args: TArgs) => Promise<TResult>, uidResolver?: (...args: TArgs) => string): {
    (...args: TArgs): Promise<TResult>;
    clearCache: () => void;
};

export { createCachedFetch };
