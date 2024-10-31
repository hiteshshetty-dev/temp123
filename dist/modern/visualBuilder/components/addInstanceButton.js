import "../../chunk-5WRI5ZAA.js";

// src/visualBuilder/components/addInstanceButton.tsx
import classNames from "classnames";
import { visualBuilderStyles } from "../visualBuilder.style.js";
import { PlusIcon } from "./icons/index.js";
import { jsx, jsxs } from "preact/jsx-runtime";
function AddInstanceButtonComponent(props) {
  const fieldSchema = props.fieldSchema;
  const disabled = fieldSchema && "max_instance" in fieldSchema && fieldSchema.max_instance ? props.value.length >= fieldSchema.max_instance : false;
  return /* @__PURE__ */ jsxs(
    "button",
    {
      className: classNames(
        "visual-builder__add-button",
        visualBuilderStyles()["visual-builder__add-button"],
        {
          "visual-builder__add-button--with-label": props.label
        },
        visualBuilderStyles()["visual-builder__tooltip"]
      ),
      "data-tooltip": "Add section",
      "data-testid": "visual-builder-add-instance-button",
      disabled,
      title: disabled && fieldSchema && "max_instance" in fieldSchema ? `Max ${fieldSchema.max_instance} instances allowed` : void 0,
      onClick: (e) => {
        const event = e;
        props.onClick(event);
      },
      children: [
        /* @__PURE__ */ jsx(PlusIcon, {}),
        props.label ? /* @__PURE__ */ jsx(
          "span",
          {
            title: props.label,
            className: classNames(
              "visual-builder__add-button-label",
              visualBuilderStyles()["visual-builder__add-button-label"]
            ),
            children: props.label
          }
        ) : null
      ]
    }
  );
}
var addInstanceButton_default = AddInstanceButtonComponent;
export {
  addInstanceButton_default as default
};
//# sourceMappingURL=addInstanceButton.js.map