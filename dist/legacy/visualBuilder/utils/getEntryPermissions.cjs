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

// src/visualBuilder/utils/getEntryPermissions.ts
var getEntryPermissions_exports = {};
__export(getEntryPermissions_exports, {
  getEntryPermissions: () => getEntryPermissions
});
module.exports = __toCommonJS(getEntryPermissions_exports);
var import_visualBuilderPostMessage = __toESM(require("./visualBuilderPostMessage.cjs"), 1);
async function getEntryPermissions({
  entryUid,
  contentTypeUid,
  locale
}) {
  var _a;
  try {
    const permissions = await ((_a = import_visualBuilderPostMessage.default) == null ? void 0 : _a.send(
      "get-permissions",
      {
        type: "entry",
        entryUid,
        contentTypeUid,
        locale
      }
    ));
    if (permissions) {
      return permissions;
    }
  } catch (error) {
    console.debug("[Visual Builder] Error fetching permissions", error);
  }
  return {
    create: true,
    read: true,
    update: true,
    delete: true,
    publish: true
  };
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  getEntryPermissions
});
//# sourceMappingURL=getEntryPermissions.cjs.map