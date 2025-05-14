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

// src/visualBuilder/components/Collab/Avatar/Avatar.tsx
var Avatar_exports = {};
__export(Avatar_exports, {
  default: () => Avatar_default
});
module.exports = __toCommonJS(Avatar_exports);
var import_Tooltip = __toESM(require("../Tooltip/Tooltip.cjs"), 1);
var import_classnames = __toESM(require("classnames"), 1);
var import_collab = require("../../../collab.style.cjs");
var import_jsx_runtime = require("preact/jsx-runtime");
function getInitials(name) {
  if (!name) return "";
  const nameParts = name.trim().split(" ");
  if (nameParts.length === 1) {
    return name.substring(0, 2);
  }
  return nameParts[0][0] + nameParts[nameParts.length - 1][0];
}
function DisplayAvatarContent({
  type,
  avatar,
  initials
}) {
  if (type === "image" && avatar.image) {
    return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      "img",
      {
        "data-testid": "collab-avatar-image",
        src: avatar.image,
        alt: avatar.name,
        className: (0, import_classnames.default)(
          "collab-avatar__image",
          (0, import_collab.collabStyles)()["collab-avatar__image"]
        )
      }
    );
  }
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: `collab-avatar-link__initials`, children: initials });
}
function Avatar({
  avatar,
  type = "text",
  testId = "collab-avatar"
}) {
  const initials = getInitials(avatar.name);
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { "data-testid": testId, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    import_Tooltip.default,
    {
      content: avatar.name || avatar.email || "",
      position: "bottom",
      children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        "div",
        {
          className: (0, import_classnames.default)(
            "collab-avatar",
            "collab-avatar--single",
            "flex-v-center",
            (0, import_collab.collabStyles)()["collab-avatar"],
            (0, import_collab.collabStyles)()["collab-avatar--single"],
            import_collab.flexAlignCenter
          ),
          children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
            "span",
            {
              className: (0, import_classnames.default)(
                "collab-avatar__link",
                "flex-v-center",
                (0, import_collab.collabStyles)()["collab-avatar__link"],
                import_collab.flexAlignCenter
              ),
              children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                DisplayAvatarContent,
                {
                  type,
                  avatar,
                  initials
                }
              )
            }
          )
        }
      )
    }
  ) });
}
var Avatar_default = Avatar;
//# sourceMappingURL=Avatar.cjs.map