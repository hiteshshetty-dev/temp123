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

// src/configManager/handleUserConfig.ts
var handleUserConfig_exports = {};
__export(handleUserConfig_exports, {
  handleInitData: () => handleInitData,
  handleUserConfig: () => handleUserConfig
});
module.exports = __toCommonJS(handleUserConfig_exports);
var import_types = require("../types/types.cjs");
var import_configManager = __toESM(require("./configManager.cjs"), 1);
var handleClientUrlParams = (userConfig) => {
  const config = import_configManager.default.get();
  const clientUrlParams = config.clientUrlParams;
  import_configManager.default.set(
    "clientUrlParams.host",
    userConfig.host ?? config.clientUrlParams.host
  );
  import_configManager.default.set(
    "clientUrlParams.protocol",
    userConfig.protocol ?? clientUrlParams.protocol
  );
  import_configManager.default.set("clientUrlParams.port", userConfig.port ?? clientUrlParams.port);
  if (userConfig.protocol !== void 0 && userConfig.port === void 0) {
    switch (userConfig.protocol) {
      case "http": {
        import_configManager.default.set("clientUrlParams.port", 80);
        break;
      }
      case "https": {
        import_configManager.default.set("clientUrlParams.port", 443);
        break;
      }
    }
  }
  let host = config.clientUrlParams.host;
  if (typeof host == "string" && host.endsWith("/")) {
    host = host.slice(0, -1);
    import_configManager.default.set("clientUrlParams.host", host);
  }
  const url = `${clientUrlParams.protocol}://${config.clientUrlParams.host}:${clientUrlParams.port}`;
  import_configManager.default.set("clientUrlParams.url", url);
};
var handleInitData = (initData) => {
  const config = import_configManager.default.get();
  const stackSdk = initData.stackSdk || config.stackSdk;
  import_configManager.default.set(
    "enable",
    initData.enable ?? stackSdk.live_preview?.enable ?? config.enable
  );
  import_configManager.default.set(
    "ssr",
    stackSdk.live_preview?.ssr ?? initData.ssr ?? (typeof initData.stackSdk === "object" ? false : true) ?? true
  );
  import_configManager.default.set(
    "runScriptsOnUpdate",
    initData.runScriptsOnUpdate ?? stackSdk.live_preview?.runScriptsOnUpdate ?? config.runScriptsOnUpdate
  );
  import_configManager.default.set("stackSdk", initData.stackSdk ?? config.stackSdk);
  import_configManager.default.set(
    "cleanCslpOnProduction",
    initData.cleanCslpOnProduction ?? stackSdk.live_preview?.cleanCslpOnProduction ?? config.cleanCslpOnProduction
  );
  import_configManager.default.set("editButton", {
    enable: initData.editButton?.enable ?? stackSdk.live_preview?.editButton?.enable ?? config.editButton.enable,
    // added extra check if exclude data passed by user is array or not
    exclude: Array.isArray(initData.editButton?.exclude) && initData.editButton?.exclude ? initData.editButton?.exclude : Array.isArray(stackSdk.live_preview?.exclude) && stackSdk.live_preview?.exclude ? stackSdk.live_preview?.exclude : config.editButton.exclude ?? [],
    position: initData.editButton?.position ?? stackSdk.live_preview?.position ?? config.editButton.position ?? "top",
    includeByQueryParameter: initData.editButton?.includeByQueryParameter ?? stackSdk.live_preview?.includeByQueryParameter ?? config.editButton.includeByQueryParameter ?? true
  });
  import_configManager.default.set("editInVisualBuilderButton", {
    enable: initData.editInVisualBuilderButton?.enable ?? stackSdk.live_preview?.editInVisualBuilderButton?.enable ?? config.editInVisualBuilderButton.enable,
    position: initData.editInVisualBuilderButton?.position ?? stackSdk.live_preview?.position ?? config.editInVisualBuilderButton.position ?? "bottom-right"
  });
  handleClientUrlParams(
    initData.clientUrlParams ?? stackSdk.live_preview?.clientUrlParams ?? config.clientUrlParams
  );
  if (initData.mode) {
    switch (initData.mode) {
      case "preview": {
        import_configManager.default.set("mode", import_types.ILivePreviewModeConfig.PREVIEW);
        break;
      }
      case "builder": {
        import_configManager.default.set("mode", import_types.ILivePreviewModeConfig.BUILDER);
        break;
      }
      default: {
        throw new TypeError(
          "Live Preview SDK: The mode must be either 'builder' or 'preview'"
        );
      }
    }
  }
  import_configManager.default.set(
    "debug",
    initData.debug ?? stackSdk.live_preview?.debug ?? config.debug
  );
  handleStackDetails(initData, stackSdk);
};
function handleStackDetails(initData, stackSdk) {
  const config = import_configManager.default.get();
  import_configManager.default.set(
    "stackDetails.apiKey",
    initData.stackDetails?.apiKey ?? config.stackDetails.apiKey
  );
  import_configManager.default.set(
    "stackDetails.environment",
    initData.stackDetails?.environment ?? stackSdk.environment ?? config.stackDetails.environment
  );
  import_configManager.default.set(
    "stackDetails.branch",
    initData.stackDetails?.branch ?? stackSdk.branch ?? stackSdk.headers?.branch ?? config.stackDetails.branch
  );
  import_configManager.default.set(
    "stackDetails.locale",
    initData.stackDetails?.locale ?? config.stackDetails.locale
  );
  if (config.mode >= import_types.ILivePreviewModeConfig.BUILDER) {
    if (!config.stackDetails.environment) {
      throw Error("Live preview SDK: environment is required");
    }
    if (!config.stackDetails.apiKey) {
      throw Error("Live preview SDK: api key is required");
    }
  }
}
var handleUserConfig = {
  clientUrlParams: handleClientUrlParams
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  handleInitData,
  handleUserConfig
});
//# sourceMappingURL=handleUserConfig.cjs.map