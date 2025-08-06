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

// src/visualBuilder/components/FieldLocationAppList.tsx
var FieldLocationAppList_exports = {};
__export(FieldLocationAppList_exports, {
  FieldLocationAppList: () => FieldLocationAppList
});
module.exports = __toCommonJS(FieldLocationAppList_exports);
var import_compat = require("preact/compat");
var import_EmptyAppIcon = require("./icons/EmptyAppIcon.cjs");
var import_postMessage = require("../utils/types/postMessage.types.cjs");
var import_visualBuilderPostMessage = __toESM(require("../utils/visualBuilderPostMessage.cjs"), 1);
var import_visualBuilder = require("../visualBuilder.style.cjs");
var import_classnames = __toESM(require("classnames"), 1);
var import_jsx_runtime = require("preact/jsx-runtime");
var normalize = (text) => text.toLowerCase().replace(/[^a-z0-9 ]/gi, "").trim();
var FieldLocationAppList = ({
  apps,
  position,
  toolbarRef,
  domEditStack,
  setDisplayAllApps
}) => {
  const remainingApps = apps.filter((app, index) => index !== 0);
  const [search, setSearch] = (0, import_compat.useState)("");
  const filteredApps = (0, import_compat.useMemo)(() => {
    if (!search.trim()) return remainingApps;
    const normalizedSearch = normalize(search);
    return remainingApps.filter((app) => {
      return normalize(app.title).includes(normalizedSearch);
    });
  }, [search, remainingApps]);
  const handleAppClick = (app) => {
    import_visualBuilderPostMessage.default?.send(
      import_postMessage.VisualBuilderPostMessageEvents.FIELD_LOCATION_SELECTED_APP,
      {
        app,
        position: toolbarRef.current?.getBoundingClientRect(),
        DomEditStack: domEditStack
      }
    );
    setDisplayAllApps(false);
  };
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
    "div",
    {
      className: (0, import_classnames.default)(
        (0, import_visualBuilder.visualBuilderStyles)()["visual-builder__field-location-app-list"],
        {
          [(0, import_visualBuilder.visualBuilderStyles)()["visual-builder__field-location-app-list--left"]]: position === "left",
          [(0, import_visualBuilder.visualBuilderStyles)()["visual-builder__field-location-app-list--right"]]: position === "right"
        }
      ),
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
          "div",
          {
            className: (0, import_visualBuilder.visualBuilderStyles)()["visual-builder__field-location-app-list__search-container"],
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                "svg",
                {
                  width: "14",
                  height: "14",
                  viewBox: "0 0 14 14",
                  fill: "none",
                  xmlns: "http://www.w3.org/2000/svg",
                  className: (0, import_classnames.default)(
                    "Search__search-icon Icon--mini",
                    (0, import_visualBuilder.visualBuilderStyles)()["visual-builder__field-location-app-list__search-icon"]
                  ),
                  children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
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
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                "input",
                {
                  type: "text",
                  value: search,
                  onInput: (e) => setSearch(e.target.value),
                  placeholder: "Search for Apps",
                  className: (0, import_visualBuilder.visualBuilderStyles)()["visual-builder__field-location-app-list__search-input"]
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
          "div",
          {
            className: (0, import_visualBuilder.visualBuilderStyles)()["visual-builder__field-location-app-list__content"],
            children: [
              filteredApps.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                "div",
                {
                  className: (0, import_visualBuilder.visualBuilderStyles)()["visual-builder__field-location-app-list__no-results"],
                  children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                    "span",
                    {
                      className: (0, import_visualBuilder.visualBuilderStyles)()["visual-builder__field-location-app-list__no-results-text"],
                      children: "No matching results found!"
                    }
                  )
                }
              ),
              filteredApps.map((app) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
                "div",
                {
                  className: (0, import_visualBuilder.visualBuilderStyles)()["visual-builder__field-location-app-list__item"],
                  onClick: () => handleAppClick(app),
                  children: [
                    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                      "div",
                      {
                        className: (0, import_visualBuilder.visualBuilderStyles)()["visual-builder__field-location-app-list__item-icon-container"],
                        children: app.icon ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                          "img",
                          {
                            src: app.icon,
                            alt: app.title,
                            className: (0, import_visualBuilder.visualBuilderStyles)()["visual-builder__field-location-app-list__item-icon"]
                          }
                        ) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_EmptyAppIcon.EmptyAppIcon, { id: app.app_installation_uid })
                      }
                    ),
                    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                      "span",
                      {
                        className: (0, import_visualBuilder.visualBuilderStyles)()["visual-builder__field-location-app-list__item-title"],
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  FieldLocationAppList
});
//# sourceMappingURL=FieldLocationAppList.cjs.map