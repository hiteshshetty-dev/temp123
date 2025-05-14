import "../../chunk-5WRI5ZAA.js";

// src/visualBuilder/utils/createCachedFetch.ts
function createCachedFetch(fetchFn, uidResolver = (...args) => JSON.stringify(args)) {
  const cache = /* @__PURE__ */ new Map();
  const pendingPromises = /* @__PURE__ */ new Map();
  async function cachedFetch(...args) {
    const uid = uidResolver(...args);
    if (cache.has(uid)) {
      return cache.get(uid);
    }
    if (pendingPromises.has(uid)) {
      return pendingPromises.get(uid);
    }
    const promise = fetchFn(...args).then((data) => {
      cache.set(uid, data);
      pendingPromises.delete(uid);
      return data;
    }).catch((error) => {
      pendingPromises.delete(uid);
      throw error;
    });
    pendingPromises.set(uid, promise);
    return promise;
  }
  cachedFetch.clearCache = () => {
    cache.clear();
    pendingPromises.clear();
  };
  return cachedFetch;
}
export {
  createCachedFetch
};
//# sourceMappingURL=createCachedFetch.js.map