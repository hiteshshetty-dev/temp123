import "../chunk-5WRI5ZAA.js";

// src/configManager/config.default.ts
import {
  ILivePreviewWindowType
} from "../types/types.js";
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
    windowType: ILivePreviewWindowType.INDEPENDENT,
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
export {
  getDefaultConfig,
  getUserInitData
};
//# sourceMappingURL=config.default.js.map