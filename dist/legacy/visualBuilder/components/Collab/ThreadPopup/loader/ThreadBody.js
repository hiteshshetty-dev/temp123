import "../../../../../chunk-5WRI5ZAA.js";

// src/visualBuilder/components/Collab/ThreadPopup/loader/ThreadBody.tsx
import SkeletonTile from "../../SkeletonTile/SkeletonTile.js";
import { collabStyles } from "../../../../collab.style.js";
import classNames from "classnames";
import { jsx, jsxs } from "preact/jsx-runtime";
var ThreadBodyLoader = () => {
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: classNames(
        "collab-thread-body-comment--loader",
        collabStyles()["collab-thread-body-comment--loader"]
      ),
      children: [
        /* @__PURE__ */ jsxs("div", { style: { display: "flex" }, children: [
          /* @__PURE__ */ jsx(
            SkeletonTile,
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
          /* @__PURE__ */ jsx(
            SkeletonTile,
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
        /* @__PURE__ */ jsx(
          SkeletonTile,
          {
            numberOfTiles: 1,
            tileHeight: 14,
            tileWidth: 300,
            tileBottomSpace: 5,
            tileTopSpace: 0,
            tileleftSpace: 0
          }
        ),
        /* @__PURE__ */ jsx(
          SkeletonTile,
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
export {
  ThreadBody_default as default
};
//# sourceMappingURL=ThreadBody.js.map