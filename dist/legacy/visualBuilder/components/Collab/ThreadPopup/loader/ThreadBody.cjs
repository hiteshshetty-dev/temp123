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

// src/visualBuilder/components/Collab/ThreadPopup/loader/ThreadBody.tsx
var ThreadBody_exports = {};
__export(ThreadBody_exports, {
  default: () => ThreadBody_default
});
module.exports = __toCommonJS(ThreadBody_exports);
var import_SkeletonTile = __toESM(require("../../SkeletonTile/SkeletonTile.cjs"), 1);
var import_collab = require("../../../../collab.style.cjs");
var import_classnames = __toESM(require("classnames"), 1);
var import_jsx_runtime = require("preact/jsx-runtime");
var ThreadBodyLoader = () => {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
    "div",
    {
      className: (0, import_classnames.default)(
        "collab-thread-body-comment--loader",
        (0, import_collab.collabStyles)()["collab-thread-body-comment--loader"]
      ),
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: { display: "flex" }, children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
            import_SkeletonTile.default,
            {
              numberOfTiles: 1,
              tileHeight: 32,
              tileWidth: 32,
              tileBottomSpace: 0,
              tileTopSpace: 0,
              tileleftSpace: 0,
              tileRadius: 50
            }
          ),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
            import_SkeletonTile.default,
            {
              numberOfTiles: 2,
              tileHeight: 10,
              tileWidth: 130,
              tileBottomSpace: 7,
              tileTopSpace: 3,
              tileleftSpace: 10
            }
          )
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          import_SkeletonTile.default,
          {
            numberOfTiles: 1,
            tileHeight: 14,
            tileWidth: 300,
            tileBottomSpace: 5,
            tileTopSpace: 0,
            tileleftSpace: 0
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          import_SkeletonTile.default,
          {
            numberOfTiles: 1,
            tileHeight: 14,
            tileWidth: 230,
            tileBottomSpace: 0,
            tileTopSpace: 0,
            tileleftSpace: 0
          }
        )
      ]
    }
  );
};
var ThreadBody_default = ThreadBodyLoader;
//# sourceMappingURL=ThreadBody.cjs.map