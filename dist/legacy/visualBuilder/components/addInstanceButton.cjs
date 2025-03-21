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

// src/visualBuilder/components/addInstanceButton.tsx
var addInstanceButton_exports = {};
__export(addInstanceButton_exports, {
  default: () => addInstanceButton_default
});
module.exports = __toCommonJS(addInstanceButton_exports);
var import_classnames = __toESM(require("classnames"), 1);
var import_visualBuilder = require("../visualBuilder.style.cjs");
var import_icons = require("./icons/index.cjs");
var import_visualBuilderPostMessage = __toESM(require("../utils/visualBuilderPostMessage.cjs"), 1);
var import_postMessage = require("../utils/types/postMessage.types.cjs");
var import_jsx_runtime = require("preact/jsx-runtime");
function AddInstanceButtonComponent(props) {
  const fieldSchema = props.fieldSchema;
  const fieldMetadata = props.fieldMetadata;
  const index = props.index;
  const loading = props.loading;
  const onClick = async (event) => {
    var _a;
    loading.value = true;
    try {
      await ((_a = import_visualBuilderPostMessage.default) == null ? void 0 : _a.send(
        import_postMessage.VisualBuilderPostMessageEvents.ADD_INSTANCE,
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
  const buttonClassName = (0, import_classnames.default)(
    "visual-builder__add-button",
    (0, import_visualBuilder.visualBuilderStyles)()["visual-builder__add-button"],
    {
      "visual-builder__add-button--with-label": props.label
    },
    {
      [(0, import_visualBuilder.visualBuilderStyles)()["visual-builder__add-button--loading"]]: loading.value
    },
    (0, import_visualBuilder.visualBuilderStyles)()["visual-builder__tooltip"]
  );
  const maxInstances = fieldSchema && fieldSchema.data_type !== "block" ? fieldSchema.max_instance : void 0;
  const isMaxInstances = maxInstances ? props.value.length >= maxInstances : false;
  const disabled = loading.value || isMaxInstances;
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
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
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_icons.PlusIcon, {}),
        props.label ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          "span",
          {
            title: props.label,
            className: (0, import_classnames.default)(
              "visual-builder__add-button-label",
              (0, import_visualBuilder.visualBuilderStyles)()["visual-builder__add-button-label"]
            ),
            children: props.label
          }
        ) : null
      ]
    }
  );
}
var addInstanceButton_default = AddInstanceButtonComponent;
//# sourceMappingURL=addInstanceButton.cjs.map