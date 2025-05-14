import "../../chunk-5WRI5ZAA.js";

// src/visualBuilder/components/addInstanceButton.tsx
import classNames from "classnames";
import { visualBuilderStyles } from "../visualBuilder.style.js";
import { PlusIcon } from "./icons/index.js";
import visualBuilderPostMessage from "../utils/visualBuilderPostMessage.js";
import { VisualBuilderPostMessageEvents } from "../utils/types/postMessage.types.js";
import { jsx, jsxs } from "preact/jsx-runtime";
function AddInstanceButtonComponent(props) {
  const fieldSchema = props.fieldSchema;
  const fieldMetadata = props.fieldMetadata;
  const index = props.index;
  const loading = props.loading;
  const onClick = async (event) => {
    var _a;
    loading.value = true;
    try {
      await ((_a = visualBuilderPostMessage) == null ? void 0 : _a.send(
        VisualBuilderPostMessageEvents.ADD_INSTANCE,
        {
          fieldMetadata,
          index
        }
      ));
    } catch (error) {
      console.error("Visual Builder: Failed to add instance", error);
    }
    loading.value = false;
    props.onClick(event);
  };
  const buttonClassName = classNames(
    "visual-builder__add-button",
    visualBuilderStyles()["visual-builder__add-button"],
    {
      "visual-builder__add-button--with-label": props.label
    },
    {
      [visualBuilderStyles()["visual-builder__add-button--loading"]]: loading.value
    },
    visualBuilderStyles()["visual-builder__tooltip"]
  );
  const maxInstances = fieldSchema && fieldSchema.data_type !== "block" ? fieldSchema.max_instance : void 0;
  const isMaxInstances = maxInstances ? props.value.length >= maxInstances : false;
  const disabled = loading.value || isMaxInstances;
  return /* @__PURE__ */ jsxs(
    "button",
    {
      className: buttonClassName,
      "data-tooltip": "Add section",
      "data-testid": "visual-builder-add-instance-button",
      disabled,
      title: maxInstances && isMaxInstances ? `Max ${maxInstances} instances allowed` : void 0,
      onClick: (e) => {
        const event = e;
        onClick(event);
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