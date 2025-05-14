import "../chunk-5WRI5ZAA.js";

// src/configManager/handleUserConfig.ts
import {
  ILivePreviewModeConfig
} from "../types/types.js";
import Config from "./configManager.js";
var handleClientUrlParams = (userConfig) => {
  const config = Config.get();
  const clientUrlParams = config.clientUrlParams;
  Config.set(
    "clientUrlParams.host",
    userConfig.host ?? config.clientUrlParams.host
  );
  Config.set(
    "clientUrlParams.protocol",
    userConfig.protocol ?? clientUrlParams.protocol
  );
  Config.set("clientUrlParams.port", userConfig.port ?? clientUrlParams.port);
  if (userConfig.protocol !== void 0 && userConfig.port === void 0) {
    switch (userConfig.protocol) {
      case "http": {
        Config.set("clientUrlParams.port", 80);
        break;
      }
      case "https": {
        Config.set("clientUrlParams.port", 443);
        break;
      }
    }
  }
  let host = config.clientUrlParams.host;
  if (typeof host == "string" && host.endsWith("/")) {
    host = host.slice(0, -1);
    Config.set("clientUrlParams.host", host);
  }
  const url = `${clientUrlParams.protocol}://${config.clientUrlParams.host}:${clientUrlParams.port}`;
  Config.set("clientUrlParams.url", url);
};
var handleInitData = (initData) => {
  var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x;
  const config = Config.get();
  const stackSdk = initData.stackSdk || config.stackSdk;
  Config.set(
    "enable",
    initData.enable ?? ((_a = stackSdk.live_preview) == null ? void 0 : _a.enable) ?? config.enable
  );
  Config.set(
    "ssr",
    ((_b = stackSdk.live_preview) == null ? void 0 : _b.ssr) ?? initData.ssr ?? (typeof initData.stackSdk === "object" ? false : true) ?? true
  );
  Config.set(
    "runScriptsOnUpdate",
    initData.runScriptsOnUpdate ?? ((_c = stackSdk.live_preview) == null ? void 0 : _c.runScriptsOnUpdate) ?? config.runScriptsOnUpdate
  );
  Config.set("stackSdk", initData.stackSdk ?? config.stackSdk);
  Config.set(
    "cleanCslpOnProduction",
    initData.cleanCslpOnProduction ?? ((_d = stackSdk.live_preview) == null ? void 0 : _d.cleanCslpOnProduction) ?? config.cleanCslpOnProduction
  );
  Config.set("editButton", {
    enable: ((_e = initData.editButton) == null ? void 0 : _e.enable) ?? ((_g = (_f = stackSdk.live_preview) == null ? void 0 : _f.editButton) == null ? void 0 : _g.enable) ?? config.editButton.enable,
    // added extra check if exclude data passed by user is array or not
    exclude: Array.isArray((_h = initData.editButton) == null ? void 0 : _h.exclude) && ((_i = initData.editButton) == null ? void 0 : _i.exclude) ? (_j = initData.editButton) == null ? void 0 : _j.exclude : Array.isArray((_k = stackSdk.live_preview) == null ? void 0 : _k.exclude) && ((_l = stackSdk.live_preview) == null ? void 0 : _l.exclude) ? (_m = stackSdk.live_preview) == null ? void 0 : _m.exclude : config.editButton.exclude ?? [],
    position: ((_n = initData.editButton) == null ? void 0 : _n.position) ?? ((_o = stackSdk.live_preview) == null ? void 0 : _o.position) ?? config.editButton.position ?? "top",
    includeByQueryParameter: ((_p = initData.editButton) == null ? void 0 : _p.includeByQueryParameter) ?? ((_q = stackSdk.live_preview) == null ? void 0 : _q.includeByQueryParameter) ?? config.editButton.includeByQueryParameter ?? true
  });
  Config.set("editInVisualBuilderButton", {
    enable: ((_r = initData.editInVisualBuilderButton) == null ? void 0 : _r.enable) ?? ((_t = (_s = stackSdk.live_preview) == null ? void 0 : _s.editInVisualBuilderButton) == null ? void 0 : _t.enable) ?? config.editInVisualBuilderButton.enable,
    position: ((_u = initData.editInVisualBuilderButton) == null ? void 0 : _u.position) ?? ((_v = stackSdk.live_preview) == null ? void 0 : _v.position) ?? config.editInVisualBuilderButton.position ?? "bottom-right"
  });
  handleClientUrlParams(
    initData.clientUrlParams ?? ((_w = stackSdk.live_preview) == null ? void 0 : _w.clientUrlParams) ?? config.clientUrlParams
  );
  if (initData.mode) {
    switch (initData.mode) {
      case "preview": {
        Config.set("mode", ILivePreviewModeConfig.PREVIEW);
        break;
      }
      case "builder": {
        Config.set("mode", ILivePreviewModeConfig.BUILDER);
        break;
      }
      default: {
        throw new TypeError(
          "Live Preview SDK: The mode must be either 'builder' or 'preview'"
        );
      }
    }
  }
  Config.set(
    "debug",
    initData.debug ?? ((_x = stackSdk.live_preview) == null ? void 0 : _x.debug) ?? config.debug
  );
  handleStackDetails(initData, stackSdk);
};
function handleStackDetails(initData, stackSdk) {
  var _a, _b, _c, _d, _e;
  const config = Config.get();
  Config.set(
    "stackDetails.apiKey",
    ((_a = initData.stackDetails) == null ? void 0 : _a.apiKey) ?? config.stackDetails.apiKey
  );
  Config.set(
    "stackDetails.environment",
    ((_b = initData.stackDetails) == null ? void 0 : _b.environment) ?? stackSdk.environment ?? config.stackDetails.environment
  );
  Config.set(
    "stackDetails.branch",
    ((_c = initData.stackDetails) == null ? void 0 : _c.branch) ?? stackSdk.branch ?? ((_d = stackSdk.headers) == null ? void 0 : _d.branch) ?? config.stackDetails.branch
  );
  Config.set(
    "stackDetails.locale",
    ((_e = initData.stackDetails) == null ? void 0 : _e.locale) ?? config.stackDetails.locale
  );
  if (config.mode >= ILivePreviewModeConfig.BUILDER) {
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
export {
  handleInitData,
  handleUserConfig
};
//# sourceMappingURL=handleUserConfig.js.map