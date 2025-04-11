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

// src/configManager/config.default.ts
var config_default_exports = {};
__export(config_default_exports, {
  getDefaultConfig: () => getDefaultConfig,
  getUserInitData: () => getUserInitData
});
module.exports = __toCommonJS(config_default_exports);
var import_types = require("../types/types.cjs");
function getUserInitData() {
  return {
    ssr: true,
    enable: true,
    debug: false,
    cleanCslpOnProduction: true,
    editButton: {
      enable: true,
      exclude: [],
      position: "top",
      includeByQueryParameter: true
    },
    editInVisualBuilderButton: {
      enable: true,
      position: "bottom-right"
    },
    mode: "preview",
    stackDetails: {
      apiKey: "",
      environment: "",
      branch: ""
    },
    clientUrlParams: {
      protocol: "https",
      host: "app.contentstack.com",
      port: 443
    },
    stackSdk: {
      live_preview: {},
      environment: ""
    },
    runScriptsOnUpdate: false
  };
}
function getDefaultConfig() {
  return {
    ssr: true,
    enable: true,
    debug: false,
    cleanCslpOnProduction: true,
    editButton: {
      enable: true,
      exclude: [],
      position: "top",
      includeByQueryParameter: true
    },
    editInVisualBuilderButton: {
      enable: true,
      position: "bottom-right"
    },
    hash: "",
    mode: 1,
    windowType: import_types.ILivePreviewWindowType.INDEPENDENT,
    stackDetails: {
      apiKey: "",
      environment: "",
      contentTypeUid: "",
      entryUid: "",
      locale: "en-us",
      branch: "main",
      masterLocale: "en-us"
    },
    clientUrlParams: {
      protocol: "https",
      host: "app.contentstack.com",
      port: 443,
      url: "https://app.contentstack.com:443"
    },
    stackSdk: {
      live_preview: {},
      headers: {
        api_key: ""
      },
      environment: ""
    },
    runScriptsOnUpdate: false,
    onChange() {
      return;
    },
    elements: {
      highlightedElement: null
    },
    collab: {
      enable: false,
      fromShare: false,
      pauseFeedback: false,
      isFeedbackMode: false,
      inviteMetadata: {
        currentUser: {
          email: "",
          uid: ""
        },
        users: [],
        inviteUid: ""
      },
      payload: []
    }
  };
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  getDefaultConfig,
  getUserInitData
});
//# sourceMappingURL=config.default.cjs.map