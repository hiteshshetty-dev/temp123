import "../../../../chunk-5WRI5ZAA.js";

// src/visualBuilder/components/Collab/SkeletonTile/SkeletonTile.tsx
import { collabStyles } from "../../../collab.style.js";
import classNames from "classnames";
import { jsx } from "preact/jsx-runtime";
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
  return /* @__PURE__ */ jsx(
    "svg",
    {
      "data-testid": testId,
      height: svgHeight,
      width: svgWidth,
      className: classNames(
        "collab-skeletonTileSvgClass",
        collabStyles()["collab-skeletonTileSvgClass"]
      ),
      fill: "#EDF1F7",
      children: Array.from({ length: numberOfTiles }).map((_, index) => /* @__PURE__ */ jsx("g", { children: /* @__PURE__ */ jsx(
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
export {
  SkeletonTile_default as default
};
//# sourceMappingURL=SkeletonTile.js.map