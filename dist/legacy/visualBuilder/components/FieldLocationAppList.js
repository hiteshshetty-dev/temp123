import "../../chunk-5WRI5ZAA.js";

// src/visualBuilder/components/FieldLocationAppList.tsx
import { useState, useMemo } from "preact/compat";
import { EmptyAppIcon } from "./icons/EmptyAppIcon.js";
import { VisualBuilderPostMessageEvents } from "../utils/types/postMessage.types.js";
import visualBuilderPostMessage from "../utils/visualBuilderPostMessage.js";
import { visualBuilderStyles } from "../visualBuilder.style.js";
import classNames from "classnames";
import { jsx, jsxs } from "preact/jsx-runtime";
var normalize = (text) => text.toLowerCase().replace(/[^a-z0-9 ]/gi, "").trim();
var FieldLocationAppList = ({
  apps,
  position,
  toolbarRef,
  domEditStack,
  setDisplayAllApps
}) => {
  const remainingApps = apps.filter((app, index) => index !== 0);
  const [search, setSearch] = useState("");
  const filteredApps = useMemo(() => {
    if (!search.trim()) return remainingApps;
    const normalizedSearch = normalize(search);
    return remainingApps.filter((app) => {
      return normalize(app.title).includes(normalizedSearch);
    });
  }, [search, remainingApps]);
  const handleAppClick = (app) => {
    var _a, _b;
    (_b = visualBuilderPostMessage) == null ? void 0 : _b.send(
      VisualBuilderPostMessageEvents.FIELD_LOCATION_SELECTED_APP,
      {
        app,
        position: (_a = toolbarRef.current) == null ? void 0 : _a.getBoundingClientRect(),
        DomEditStack: domEditStack
      }
    );
    setDisplayAllApps(false);
  };
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: classNames(
        visualBuilderStyles()["visual-builder__field-location-app-list"],
        {
          [visualBuilderStyles()["visual-builder__field-location-app-list--left"]]: position === "left",
          [visualBuilderStyles()["visual-builder__field-location-app-list--right"]]: position === "right"
        }
      ),
      children: [
        /* @__PURE__ */ jsxs(
          "div",
          {
            className: visualBuilderStyles()["visual-builder__field-location-app-list__search-container"],
            children: [
              /* @__PURE__ */ jsx(
                "svg",
                {
                  width: "14",
                  height: "14",
                  viewBox: "0 0 14 14",
                  fill: "none",
                  xmlns: "http://www.w3.org/2000/svg",
                  className: classNames(
                    "Search__search-icon Icon--mini",
                    visualBuilderStyles()["visual-builder__field-location-app-list__search-icon"]
                  ),
                  children: /* @__PURE__ */ jsx(
                    "path",
                    {
                      d: "M12.438 12.438L9.624 9.624M6.25 10.75a4.5 4.5 0 100-9 4.5 4.5 0 000 9z",
                      stroke: "#A9B6CB",
                      strokeWidth: "2",
                      strokeMiterlimit: "10",
                      strokeLinecap: "round",
                      strokeLinejoin: "round"
                    }
                  )
                }
              ),
              /* @__PURE__ */ jsx(
                "input",
                {
                  type: "text",
                  value: search,
                  onInput: (e) => setSearch(e.target.value),
                  placeholder: "Search for Apps",
                  className: visualBuilderStyles()["visual-builder__field-location-app-list__search-input"]
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ jsxs(
          "div",
          {
            className: visualBuilderStyles()["visual-builder__field-location-app-list__content"],
            children: [
              filteredApps.length === 0 && /* @__PURE__ */ jsx(
                "div",
                {
                  className: visualBuilderStyles()["visual-builder__field-location-app-list__no-results"],
                  children: /* @__PURE__ */ jsx(
                    "span",
                    {
                      className: visualBuilderStyles()["visual-builder__field-location-app-list__no-results-text"],
                      children: "No matching results found!"
                    }
                  )
                }
              ),
              filteredApps.map((app) => /* @__PURE__ */ jsxs(
                "div",
                {
                  className: visualBuilderStyles()["visual-builder__field-location-app-list__item"],
                  onClick: () => handleAppClick(app),
                  children: [
                    /* @__PURE__ */ jsx(
                      "div",
                      {
                        className: visualBuilderStyles()["visual-builder__field-location-app-list__item-icon-container"],
                        children: app.icon ? /* @__PURE__ */ jsx(
                          "img",
                          {
                            src: app.icon,
                            alt: app.title,
                            className: visualBuilderStyles()["visual-builder__field-location-app-list__item-icon"]
                          }
                        ) : /* @__PURE__ */ jsx(EmptyAppIcon, { id: app.app_installation_uid })
                      }
                    ),
                    /* @__PURE__ */ jsx(
                      "span",
                      {
                        className: visualBuilderStyles()["visual-builder__field-location-app-list__item-title"],
                        children: app.title
                      }
                    )
                  ]
                },
                app.uid
              ))
            ]
          }
        )
      ]
    }
  );
};
export {
  FieldLocationAppList
};
//# sourceMappingURL=FieldLocationAppList.js.map