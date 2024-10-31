import "../../chunk-5WRI5ZAA.js";

// src/visualBuilder/components/fieldLabelWrapper.tsx
import classNames from "classnames";
import { useEffect, useState } from "preact/compat";
import { extractDetailsFromCslp } from "../../cslp/index.js";
import { FieldSchemaMap } from "../utils/fieldSchemaMap.js";
import { isFieldDisabled } from "../utils/isFieldDisabled.js";
import visualBuilderPostMessage from "../utils/visualBuilderPostMessage.js";
import { CaretIcon, InfoIcon } from "./icons/index.js";
import { LoadingIcon } from "./icons/loading.js";
import { getFieldIcon } from "../generators/generateCustomCursor.js";
import { uniqBy } from "lodash-es";
import { visualBuilderStyles } from "../visualBuilder.style.js";
import { CslpError } from "./CslpError.js";
import { hasPostMessageError } from "../utils/errorHandling.js";
import { VisualBuilderPostMessageEvents } from "../utils/types/postMessage.types.js";
import { Fragment, jsx, jsxs } from "preact/jsx-runtime";
async function getFieldDisplayNames(fieldMetadata) {
  var _a;
  const result = await ((_a = visualBuilderPostMessage) == null ? void 0 : _a.send(VisualBuilderPostMessageEvents.GET_FIELD_DISPLAY_NAMES, fieldMetadata));
  return result;
}
function FieldLabelWrapperComponent(props) {
  const { eventDetails } = props;
  const [currentField, setCurrentField] = useState({
    text: "",
    icon: /* @__PURE__ */ jsx(CaretIcon, {}),
    prefixIcon: null,
    disabled: false,
    isVariant: false
  });
  const [displayNames, setDisplayNames] = useState(
    {}
  );
  const [displayNamesLoading, setDisplayNamesLoading] = useState(true);
  const [error, setError] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  function calculateTopOffset(index) {
    const height = -30;
    const offset = (index + 1) * height;
    return `${offset}px`;
  }
  useEffect(() => {
    const fetchData = async () => {
      var _a, _b;
      setDisplayNamesLoading(true);
      const allPaths = uniqBy(
        [
          props.fieldMetadata,
          ...props.parentPaths.map((path) => {
            return extractDetailsFromCslp(path);
          })
        ],
        "cslpValue"
      );
      const displayNames2 = await getFieldDisplayNames(allPaths);
      const fieldSchema = await FieldSchemaMap.getFieldSchema(
        props.fieldMetadata.content_type_uid,
        props.fieldMetadata.fieldPath
      );
      if (hasPostMessageError(displayNames2) || !fieldSchema) {
        setDisplayNamesLoading(false);
        setError(true);
        return;
      }
      const { isDisabled: fieldDisabled, reason } = isFieldDisabled(
        fieldSchema,
        eventDetails
      );
      const currentFieldDisplayName = (displayNames2 == null ? void 0 : displayNames2[props.fieldMetadata.cslpValue]) ?? fieldSchema.display_name;
      const hasParentPaths = !!((_a = props == null ? void 0 : props.parentPaths) == null ? void 0 : _a.length);
      const isVariant = props.fieldMetadata.variant ? true : false;
      setCurrentField({
        text: currentFieldDisplayName,
        icon: fieldDisabled ? /* @__PURE__ */ jsx(
          "div",
          {
            className: classNames(
              visualBuilderStyles()["visual-builder__tooltip--persistent"]
            ),
            "data-tooltip": reason,
            children: /* @__PURE__ */ jsx(InfoIcon, {})
          }
        ) : hasParentPaths ? /* @__PURE__ */ jsx(CaretIcon, {}) : /* @__PURE__ */ jsx(Fragment, {}),
        prefixIcon: getFieldIcon(fieldSchema),
        disabled: fieldDisabled,
        isVariant
      });
      if (displayNames2) {
        setDisplayNames(displayNames2);
      }
      if (((_b = Object.keys(displayNames2 || {})) == null ? void 0 : _b.length) === allPaths.length) {
        setDisplayNamesLoading(false);
      }
    };
    fetchData();
  }, [props]);
  const onParentPathClick = (cslp) => {
    const parentElement = props.getParentEditableElement(cslp);
    if (parentElement) {
      parentElement.click();
    }
  };
  function getCurrentFieldIcon() {
    if (error) {
      return null;
    } else if (displayNamesLoading) {
      return /* @__PURE__ */ jsx(LoadingIcon, {});
    } else {
      return currentField.icon;
    }
  }
  return /* @__PURE__ */ jsx(
    "div",
    {
      className: classNames(
        "visual-builder__focused-toolbar__field-label-container",
        visualBuilderStyles()["visual-builder__focused-toolbar__field-label-container"]
      ),
      children: /* @__PURE__ */ jsxs(
        "div",
        {
          className: classNames(
            "visual-builder__focused-toolbar__field-label-wrapper",
            visualBuilderStyles()["visual-builder__focused-toolbar__field-label-wrapper"],
            {
              "visual-builder__focused-toolbar--field-disabled": currentField.disabled
            },
            {
              [visualBuilderStyles()["visual-builder__focused-toolbar--field-disabled"]]: currentField.disabled
            },
            {
              "field-label-dropdown-open": isDropdownOpen,
              [visualBuilderStyles()["field-label-dropdown-open"]]: isDropdownOpen
            }
          ),
          onClick: () => setIsDropdownOpen((prev) => !prev),
          "data-testid": "visual-builder__focused-toolbar__field-label-wrapper",
          children: [
            /* @__PURE__ */ jsxs(
              "button",
              {
                className: classNames(
                  "visual-builder__focused-toolbar__field-label-wrapper__current-field visual-builder__button visual-builder__button--primary visual-builder__button-loader",
                  visualBuilderStyles()["visual-builder__focused-toolbar__field-label-wrapper__current-field"],
                  visualBuilderStyles()["visual-builder__button"],
                  visualBuilderStyles()["visual-builder__button--primary"],
                  visualBuilderStyles()["visual-builder__button-loader"],
                  error && visualBuilderStyles()["visual-builder__button-error"]
                ),
                disabled: displayNamesLoading,
                children: [
                  currentField.prefixIcon ? /* @__PURE__ */ jsx(
                    "div",
                    {
                      className: classNames(
                        "visual-builder__field-icon",
                        visualBuilderStyles()["visual-builder__field-icon"]
                      ),
                      dangerouslySetInnerHTML: {
                        __html: currentField.prefixIcon
                      },
                      "data-testid": "visual-builder__field-icon"
                    }
                  ) : null,
                  currentField.text ? /* @__PURE__ */ jsx(
                    "div",
                    {
                      className: classNames(
                        "visual-builder__focused-toolbar__text",
                        visualBuilderStyles()["visual-builder__focused-toolbar__text"]
                      ),
                      "data-testid": "visual-builder__focused-toolbar__text",
                      children: currentField.text
                    }
                  ) : null,
                  getCurrentFieldIcon(),
                  error ? /* @__PURE__ */ jsx(CslpError, {}) : null
                ]
              }
            ),
            props.parentPaths.map((path, index) => /* @__PURE__ */ jsx(
              "button",
              {
                className: classNames(
                  "visual-builder__focused-toolbar__field-label-wrapper__parent-field visual-builder__button visual-builder__button--secondary visual-builder__focused-toolbar__text",
                  visualBuilderStyles()["visual-builder__focused-toolbar__field-label-wrapper__parent-field"],
                  visualBuilderStyles()["visual-builder__button"],
                  visualBuilderStyles()["visual-builder__button--secondary"],
                  visualBuilderStyles()["visual-builder__focused-toolbar__text"]
                ),
                "data-target-cslp": path,
                style: { top: calculateTopOffset(index) },
                onClick: () => onParentPathClick(path),
                children: displayNames[path]
              },
              path
            ))
          ]
        }
      )
    }
  );
}
var fieldLabelWrapper_default = FieldLabelWrapperComponent;
export {
  fieldLabelWrapper_default as default
};
//# sourceMappingURL=fieldLabelWrapper.js.map