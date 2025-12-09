"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
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
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/visualBuilder/utils/getVisualBuilderRedirectionUrl.ts
var getVisualBuilderRedirectionUrl_exports = {};
__export(getVisualBuilderRedirectionUrl_exports, {
  default: () => getVisualBuilderRedirectionUrl
});
module.exports = __toCommonJS(getVisualBuilderRedirectionUrl_exports);
var import_configManager = __toESM(require("../../configManager/configManager.cjs"), 1);
var import_cslp = require("../../cslp/index.cjs");
function getVisualBuilderRedirectionUrl() {
  const { stackDetails, clientUrlParams } = import_configManager.default.get();
  const { branch, apiKey, environment, locale } = stackDetails;
  const { url: appUrl } = clientUrlParams;
  const searchParams = new URLSearchParams();
  if (branch) {
    searchParams.set("branch", branch);
  }
  if (environment) {
    searchParams.set("environment", environment);
  }
  searchParams.set("target-url", window.location.href);
  const elementWithDataCslp = document.querySelector(`[data-cslp]`);
  let localeToUse = locale;
  if (elementWithDataCslp) {
    const cslpData = elementWithDataCslp.getAttribute("data-cslp");
    if (cslpData) {
      const { locale: cslpLocale } = (0, import_cslp.extractDetailsFromCslp)(cslpData);
      localeToUse = cslpLocale;
    }
  }
  if (localeToUse) {
    searchParams.set("locale", localeToUse);
  }
  const completeURL = new URL(
    `/#!/stack/${apiKey}/visual-builder?${searchParams.toString()}`,
    appUrl
  );
  return completeURL;
}
//# sourceMappingURL=getVisualBuilderRedirectionUrl.cjs.map