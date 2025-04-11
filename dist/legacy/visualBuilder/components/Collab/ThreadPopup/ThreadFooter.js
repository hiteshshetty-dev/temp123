import "../../../../chunk-5WRI5ZAA.js";

// src/visualBuilder/components/Collab/ThreadPopup/ThreadFooter.tsx
import { useState } from "preact/hooks";
import Button from "../Button/Button.js";
import ButtonGroup from "../ButtonGroup/ButtonGroup.js";
import classNames from "classnames";
import { collabStyles, flexAlignCenter } from "../../../collab.style.js";
import { jsx, jsxs } from "preact/jsx-runtime";
var ThreadFooter = ({
  onClose,
  handleOnSaveRef,
  isDisabled,
  editComment
}) => {
  const [loading, setLoading] = useState(false);
  const onSubmit = async (event) => {
    var _a;
    setLoading(true);
    event.preventDefault();
    await ((_a = handleOnSaveRef.current) == null ? void 0 : _a.call(handleOnSaveRef));
    setLoading(false);
  };
  return /* @__PURE__ */ jsx(
    "div",
    {
      className: classNames(
        "collab-thread-footer--wrapper",
        "flex-v-center",
        collabStyles()["collab-thread-footer--wrapper"],
        flexAlignCenter
      ),
      children: /* @__PURE__ */ jsxs(ButtonGroup, { children: [
        /* @__PURE__ */ jsx(
          Button,
          {
            type: "button",
            buttonType: "tertiary",
            testId: "thread-cancel-btn",
            onClick: () => onClose(false),
            children: "Cancel"
          }
        ),
        /* @__PURE__ */ jsx(
          Button,
          {
            type: "button",
            buttonType: "primary",
            onClick: onSubmit,
            testId: "thread-save-btn",
            disabled: isDisabled || loading,
            isLoading: loading,
            children: editComment === "" ? "Post" : "Update"
          }
        )
      ] })
    }
  );
};
var ThreadFooter_default = ThreadFooter;
export {
  ThreadFooter_default as default
};
//# sourceMappingURL=ThreadFooter.js.map