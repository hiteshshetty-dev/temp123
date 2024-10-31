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
  var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n, _o, _p, _q, _r, _s;
  const config = import_configManager.default.get();
  const stackSdk = initData.stackSdk || config.stackSdk;
  import_configManager.default.set(
    "enable",
    initData.enable ?? ((_a = stackSdk.live_preview) == null ? void 0 : _a.enable) ?? config.enable
  );
  import_configManager.default.set(
    "ssr",
    ((_b = stackSdk.live_preview) == null ? void 0 : _b.ssr) ?? initData.ssr ?? (typeof initData.stackSdk === "object" ? false : true) ?? true
  );
  import_configManager.default.set(
    "runScriptsOnUpdate",
    initData.runScriptsOnUpdate ?? ((_c = stackSdk.live_preview) == null ? void 0 : _c.runScriptsOnUpdate) ?? config.runScriptsOnUpdate
  );
  import_configManager.default.set("stackSdk", initData.stackSdk ?? config.stackSdk);
  import_configManager.default.set(
    "cleanCslpOnProduction",
    initData.cleanCslpOnProduction ?? ((_d = stackSdk.live_preview) == null ? void 0 : _d.cleanCslpOnProduction) ?? config.cleanCslpOnProduction
  );
  import_configManager.default.set("editButton", {
    enable: ((_e = initData.editButton) == null ? void 0 : _e.enable) ?? ((_g = (_f = stackSdk.live_preview) == null ? void 0 : _f.editButton) == null ? void 0 : _g.enable) ?? config.editButton.enable,
    // added extra check if exclude data passed by user is array or not
    exclude: Array.isArray((_h = initData.editButton) == null ? void 0 : _h.exclude) && ((_i = initData.editButton) == null ? void 0 : _i.exclude) ? (_j = initData.editButton) == null ? void 0 : _j.exclude : Array.isArray((_k = stackSdk.live_preview) == null ? void 0 : _k.exclude) && ((_l = stackSdk.live_preview) == null ? void 0 : _l.exclude) ? (_m = stackSdk.live_preview) == null ? void 0 : _m.exclude : config.editButton.exclude ?? [],
    position: ((_n = initData.editButton) == null ? void 0 : _n.position) ?? ((_o = stackSdk.live_preview) == null ? void 0 : _o.position) ?? config.editButton.position ?? "top",
    includeByQueryParameter: ((_p = initData.editButton) == null ? void 0 : _p.includeByQueryParameter) ?? ((_q = stackSdk.live_preview) == null ? void 0 : _q.includeByQueryParameter) ?? config.editButton.includeByQueryParameter ?? true
  });
  handleClientUrlParams(
    initData.clientUrlParams ?? ((_r = stackSdk.live_preview) == null ? void 0 : _r.clientUrlParams) ?? config.clientUrlParams
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
    initData.debug ?? ((_s = stackSdk.live_preview) == null ? void 0 : _s.debug) ?? config.debug
  );
  handleStackDetails(initData, stackSdk);
};
function handleStackDetails(initData, stackSdk) {
  var _a, _b, _c, _d, _e;
  const config = import_configManager.default.get();
  import_configManager.default.set(
    "stackDetails.apiKey",
    ((_a = initData.stackDetails) == null ? void 0 : _a.apiKey) ?? config.stackDetails.apiKey
  );
  import_configManager.default.set(
    "stackDetails.environment",
    ((_b = initData.stackDetails) == null ? void 0 : _b.environment) ?? stackSdk.environment ?? config.stackDetails.environment
  );
  import_configManager.default.set(
    "stackDetails.branch",
    ((_c = initData.stackDetails) == null ? void 0 : _c.branch) ?? stackSdk.branch ?? ((_d = stackSdk.headers) == null ? void 0 : _d.branch) ?? config.stackDetails.branch
  );
  import_configManager.default.set(
    "stackDetails.locale",
    ((_e = initData.stackDetails) == null ? void 0 : _e.locale) ?? config.stackDetails.locale
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