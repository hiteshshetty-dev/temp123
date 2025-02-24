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

// src/visualBuilder/components/Collab/SkeletonTile/SkeletonTile.tsx
var SkeletonTile_exports = {};
__export(SkeletonTile_exports, {
  default: () => SkeletonTile_default
});
module.exports = __toCommonJS(SkeletonTile_exports);
var import_collab = require("../../../collab.style.cjs");
var import_classnames = __toESM(require("classnames"), 1);
var import_jsx_runtime = require("preact/jsx-runtime");
var SkeletonTile = (props) => {
  const {
    numberOfTiles,
    tileleftSpace,
    tileTopSpace,
    tileHeight,
    tileBottomSpace,
    tileWidth,
    testId,
    tileRadius = 7
  } = props;
  const svgHeight = numberOfTiles * tileHeight + numberOfTiles * tileBottomSpace + numberOfTiles * tileTopSpace;
  const svgWidth = typeof tileWidth === "string" ? tileWidth : tileWidth + tileleftSpace;
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    "svg",
    {
      "data-testid": testId,
      height: svgHeight,
      width: svgWidth,
      className: (0, import_classnames.default)(
        "collab-skeletonTileSvgClass",
        (0, import_collab.collabStyles)()["collab-skeletonTileSvgClass"]
      ),
      fill: "#EDF1F7",
      children: Array.from({ length: numberOfTiles }).map((_, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("g", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        "rect",
        {
          "data-testid": "rect",
          x: tileleftSpace,
          y: index * (tileHeight + tileBottomSpace) + tileTopSpace,
          rx: tileRadius,
          width: tileWidth,
          height: tileHeight
        }
      ) }, index))
    }
  );
};
SkeletonTile.defaultProps = {
  testId: "collab-skeletonTile"
};
var SkeletonTile_default = SkeletonTile;
//# sourceMappingURL=SkeletonTile.cjs.map