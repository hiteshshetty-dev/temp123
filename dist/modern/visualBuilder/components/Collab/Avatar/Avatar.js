import "../../../../chunk-5WRI5ZAA.js";

// src/visualBuilder/components/Collab/Avatar/Avatar.tsx
import Tooltip from "../Tooltip/Tooltip.js";
import classNames from "classnames";
import { collabStyles, flexAlignCenter } from "../../../collab.style.js";
import { jsx } from "preact/jsx-runtime";
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
    return /* @__PURE__ */ jsx(
      "img",
      {
        "data-testid": "collab-avatar-image",
        src: avatar.image,
        alt: avatar.name,
        className: classNames(
          "collab-avatar__image",
          collabStyles()["collab-avatar__image"]
        )
      }
    );
  }
  return /* @__PURE__ */ jsx("span", { className: `collab-avatar-link__initials`, children: initials });
}
function Avatar({
  avatar,
  type = "text",
  testId = "collab-avatar"
}) {
  const initials = getInitials(avatar.name);
  return /* @__PURE__ */ jsx("div", { "data-testid": testId, children: /* @__PURE__ */ jsx(
    Tooltip,
    {
      content: avatar.name || avatar.email || "",
      position: "bottom",
      children: /* @__PURE__ */ jsx(
        "div",
        {
          className: classNames(
            "collab-avatar",
            "collab-avatar--single",
            "flex-v-center",
            collabStyles()["collab-avatar"],
            collabStyles()["collab-avatar--single"],
            flexAlignCenter
          ),
          children: /* @__PURE__ */ jsx(
            "span",
            {
              className: classNames(
                "collab-avatar__link",
                "flex-v-center",
                collabStyles()["collab-avatar__link"],
                flexAlignCenter
              ),
              children: /* @__PURE__ */ jsx(
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
export {
  Avatar_default as default
};
//# sourceMappingURL=Avatar.js.map