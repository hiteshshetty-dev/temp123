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

// src/visualBuilder/utils/createCachedFetch.ts
var createCachedFetch_exports = {};
__export(createCachedFetch_exports, {
  createCachedFetch: () => createCachedFetch
});
module.exports = __toCommonJS(createCachedFetch_exports);
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  createCachedFetch
});
//# sourceMappingURL=createCachedFetch.cjs.map