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

// src/visualBuilder/components/FieldRevert/useHandleOutsideClick.ts
var useHandleOutsideClick_exports = {};
__export(useHandleOutsideClick_exports, {
  default: () => useHandleOutsideClick_default
});
module.exports = __toCommonJS(useHandleOutsideClick_exports);
var import_compat = require("preact/compat");
var useHandleOutsideClick = (ref, callback) => {
  (0, import_compat.useEffect)(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        callback();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, callback]);
};
var useHandleOutsideClick_default = useHandleOutsideClick;
//# sourceMappingURL=useHandleOutsideClick.cjs.map