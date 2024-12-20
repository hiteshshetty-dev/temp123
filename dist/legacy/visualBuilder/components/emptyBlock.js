import "../../chunk-5WRI5ZAA.js";

// src/visualBuilder/components/emptyBlock.tsx
import classNames from "classnames";
import { visualBuilderStyles } from "../visualBuilder.style.js";
import visualBuilderPostMessage from "../utils/visualBuilderPostMessage.js";
import { observeParentAndFocusNewInstance } from "../utils/multipleElementAddButton.js";
import { VisualBuilderPostMessageEvents } from "../utils/types/postMessage.types.js";
import { jsx, jsxs } from "preact/jsx-runtime";
function EmptyBlock(props) {
  const { details } = props;
  const blockParentName = details.fieldSchema.display_name;
  async function sendAddInstanceEvent() {
    var _a;
    await ((_a = visualBuilderPostMessage) == null ? void 0 : _a.send(
      VisualBuilderPostMessageEvents.ADD_INSTANCE,
      {
        fieldMetadata: details.fieldMetadata,
        index: 0
      }
    ));
    observeParentAndFocusNewInstance({
      parentCslp: details.fieldMetadata.cslpValue,
      index: 0
    });
  }
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: classNames(
        "visual-builder__empty-block",
        visualBuilderStyles()["visual-builder__empty-block"]
      ),
      children: [
        /* @__PURE__ */ jsxs(
          "div",
          {
            className: classNames(
              "visual-builder__empty-block-title",
              visualBuilderStyles()["visual-builder__empty-block-title"]
            ),
            children: [
              "There are no ",
              blockParentName.toLowerCase(),
              " on this page yet. Click the button below to add one."
            ]
          }
        ),
        /* @__PURE__ */ jsxs(
          "button",
          {
            className: classNames(
              "visual-builder__empty-block-add-button",
              visualBuilderStyles()["visual-builder__empty-block-add-button"]
            ),
            onClick: () => sendAddInstanceEvent(),
            type: "button",
            children: [
              /* @__PURE__ */ jsx("i", { className: "fas fa-plus" }),
              " \xA0",
              blockParentName
            ]
          }
        )
      ]
    }
  );
}
export {
  EmptyBlock
};
//# sourceMappingURL=emptyBlock.js.map