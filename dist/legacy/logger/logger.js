import "../chunk-5WRI5ZAA.js";

// src/logger/logger.ts
var PublicLogger = class {
  static logEvent(logCallback, message) {
    var _a;
    if (typeof process !== "undefined" && ((_a = process == null ? void 0 : process.env) == null ? void 0 : _a.NODE_ENV) !== "test") {
      logCallback("Live_Preview_SDK:", ...message);
    }
  }
  static error(...data) {
    this.logEvent(console.error, data);
  }
  static warn(...data) {
    this.logEvent(console.warn, data);
  }
  static debug(...data) {
    this.logEvent(console.debug, data);
  }
};
export {
  PublicLogger
};
//# sourceMappingURL=logger.js.map