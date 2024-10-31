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

// src/livePreview/editButton/editButton.ts
var editButton_exports = {};
__export(editButton_exports, {
  LivePreviewEditButton: () => LivePreviewEditButton,
  createMultipleEditButton: () => createMultipleEditButton,
  createSingularEditButton: () => createSingularEditButton,
  doesEditButtonExist: () => doesEditButtonExist,
  getEditButtonPosition: () => getEditButtonPosition,
  shouldRenderEditButton: () => shouldRenderEditButton,
  toggleEditButtonElement: () => toggleEditButtonElement
});
module.exports = __toCommonJS(editButton_exports);
var import_signals = require("@preact/signals");
var import_inIframe = require("../../common/inIframe.cjs");
var import_configManager = __toESM(require("../../configManager/configManager.cjs"), 1);
var import_cslp = require("../../cslp/index.cjs");
var import_editButton = require("./editButton.style.cjs");
var import_logger = require("../../logger/logger.cjs");
var import_types = require("../../types/types.cjs");
var import_livePreviewEventManager = __toESM(require("../eventManager/livePreviewEventManager.cjs"), 1);
var import_editButton2 = require("./editButton.constant.cjs");
var import_utils = require("../../utils/index.cjs");
function calculateEditButtonPosition(currentHoveredElement, cslpButtonPosition) {
  const editButtonPosition = {
    upperBoundOfTooltip: 0,
    leftBoundOfTooltip: 0
  };
  const currentRectOfElement = currentHoveredElement.getBoundingClientRect();
  try {
    const buttonMeasurementValues = {
      width: 72,
      halfWidth: 36,
      height: 40,
      basicMargin: 5,
      widthWithMargin: 77
    };
    switch (cslpButtonPosition) {
      case "top-center":
        editButtonPosition.upperBoundOfTooltip = currentRectOfElement.top - buttonMeasurementValues.height;
        editButtonPosition.leftBoundOfTooltip = currentRectOfElement.width / 2 - buttonMeasurementValues.halfWidth + currentRectOfElement.left;
        break;
      case "top-right":
        editButtonPosition.upperBoundOfTooltip = currentRectOfElement.top - buttonMeasurementValues.height;
        editButtonPosition.leftBoundOfTooltip = currentRectOfElement.right - buttonMeasurementValues.width;
        break;
      case "right":
        editButtonPosition.upperBoundOfTooltip = currentRectOfElement.top - buttonMeasurementValues.basicMargin;
        editButtonPosition.leftBoundOfTooltip = currentRectOfElement.right + buttonMeasurementValues.basicMargin;
        break;
      case "bottom":
        editButtonPosition.upperBoundOfTooltip = currentRectOfElement.bottom + buttonMeasurementValues.basicMargin;
        editButtonPosition.leftBoundOfTooltip = currentRectOfElement.left - buttonMeasurementValues.basicMargin;
        break;
      case "bottom-left":
        editButtonPosition.upperBoundOfTooltip = currentRectOfElement.bottom + buttonMeasurementValues.basicMargin;
        editButtonPosition.leftBoundOfTooltip = currentRectOfElement.left - buttonMeasurementValues.basicMargin;
        break;
      case "bottom-center":
        editButtonPosition.upperBoundOfTooltip = currentRectOfElement.bottom + buttonMeasurementValues.basicMargin;
        editButtonPosition.leftBoundOfTooltip = currentRectOfElement.width / 2 - buttonMeasurementValues.halfWidth + currentRectOfElement.left;
        break;
      case "bottom-right":
        editButtonPosition.upperBoundOfTooltip = currentRectOfElement.bottom + buttonMeasurementValues.basicMargin;
        editButtonPosition.leftBoundOfTooltip = currentRectOfElement.right - buttonMeasurementValues.width;
        break;
      case "left":
        editButtonPosition.upperBoundOfTooltip = currentRectOfElement.top - buttonMeasurementValues.basicMargin;
        editButtonPosition.leftBoundOfTooltip = currentRectOfElement.left - buttonMeasurementValues.widthWithMargin;
        break;
      // default position => top, top-left or any other string
      default:
        editButtonPosition.upperBoundOfTooltip = currentRectOfElement.top - buttonMeasurementValues.height;
        editButtonPosition.leftBoundOfTooltip = currentRectOfElement.left - buttonMeasurementValues.basicMargin;
        break;
    }
    return editButtonPosition;
  } catch (error) {
    import_logger.PublicLogger.error(error);
    return editButtonPosition;
  }
}
var createSingularEditButton = (editCallback) => {
  const singularEditButton = document.createElement("div");
  singularEditButton.classList.add("cslp-tooltip-child", "singular");
  singularEditButton.setAttribute(
    "data-test-id",
    "cslp-singular-edit-button"
  );
  singularEditButton.innerHTML = `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M8.1 3.5L0.3 11.3C0.1 11.5 0 11.7 0 12V15C0 15.6 0.4 16 1 16H4C4.3 16 4.5 15.9 4.7 15.7L12.5 7.9L8.1 3.5Z" fill="#718096"></path>
      <path d="M15.7 3.3L12.7 0.3C12.3 -0.1 11.7 -0.1 11.3 0.3L9.5 2.1L13.9 6.5L15.7 4.7C16.1 4.3 16.1 3.7 15.7 3.3Z" fill="#718096"></path>
    </svg>Edit`;
  singularEditButton.addEventListener("click", editCallback);
  return singularEditButton;
};
var createMultipleEditButton = (editCallback, linkCallback) => {
  const multipleEditButton = document.createElement("div");
  multipleEditButton.classList.add("cslp-tooltip-child");
  multipleEditButton.setAttribute("data-title", "Edit");
  multipleEditButton.setAttribute(
    "data-test-id",
    "cslp-multiple-edit-button"
  );
  multipleEditButton.innerHTML = ` <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M8.1 3.5L0.3 11.3C0.1 11.5 0 11.7 0 12V15C0 15.6 0.4 16 1 16H4C4.3 16 4.5 15.9 4.7 15.7L12.5 7.9L8.1 3.5Z" fill="#718096"></path>
      <path d="M15.7 3.3L12.7 0.3C12.3 -0.1 11.7 -0.1 11.3 0.3L9.5 2.1L13.9 6.5L15.7 4.7C16.1 4.3 16.1 3.7 15.7 3.3Z" fill="#718096"></path>
    </svg>`;
  multipleEditButton.addEventListener("click", editCallback);
  const multipleExternalLinkButton = document.createElement("div");
  multipleExternalLinkButton.classList.add("cslp-tooltip-child");
  multipleExternalLinkButton.setAttribute("data-title", "Go to link");
  multipleExternalLinkButton.setAttribute(
    "data-test-id",
    "cslp-multiple-external-link-button"
  );
  multipleExternalLinkButton.innerHTML = ` <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M2.66654 2.66758H13.3332V13.3342H6.66654V16.0009H13.3332C14.0405 16.0009 14.7187 15.72 15.2188 15.2199C15.7189 14.7198 15.9999 14.0415 15.9999 13.3342V2.66758C15.9999 1.96034 15.7189 1.28206 15.2188 0.781964C14.7187 0.281867 14.0405 0.000915527 13.3332 0.000915527H2.66654C1.9593 0.000915527 1.28102 0.281867 0.780927 0.781964C0.280829 1.28206 -0.00012207 1.96034 -0.00012207 2.66758V9.33425H2.66654V2.66758Z" fill="#718096" />
      <path d="M6.94263 7.05734L0.999958 13L2.88529 14.8853L8.82796 8.94267L10.8853 11V5.00001H4.88529L6.94263 7.05734Z" fill="#718096" />
    </svg>`;
  multipleExternalLinkButton.addEventListener("click", linkCallback);
  const multipleEditFragment = document.createDocumentFragment();
  multipleEditFragment.appendChild(multipleEditButton);
  multipleEditFragment.appendChild(multipleExternalLinkButton);
  const multipleDiv = document.createElement("div");
  multipleDiv.appendChild(multipleEditFragment);
  multipleDiv.classList.add((0, import_editButton.cslpTagStyles)()["multiple"]);
  return multipleDiv;
};
function getEditButtonPosition(currentHoveredElement, defaultPosition) {
  if (!currentHoveredElement)
    return { upperBoundOfTooltip: 0, leftBoundOfTooltip: 0 };
  const cslpButtonPosition = currentHoveredElement.getAttribute(
    "data-cslp-button-position"
  );
  if (cslpButtonPosition) {
    return calculateEditButtonPosition(
      currentHoveredElement,
      cslpButtonPosition
    );
  }
  return calculateEditButtonPosition(
    currentHoveredElement,
    defaultPosition || "top"
  );
}
function shouldRenderEditButton() {
  var _a, _b;
  const config = import_configManager.default.get();
  if (!config.editButton.enable) {
    if (config.editButton.enable === void 0)
      import_logger.PublicLogger.error(
        "enable key is required inside editButton object"
      );
    return false;
  }
  try {
    const currentLocation = new URL(window.location.href);
    const cslpButtonQueryValue = currentLocation.searchParams.get("cslp-buttons");
    if (cslpButtonQueryValue !== null && config.editButton.includeByQueryParameter !== false)
      return cslpButtonQueryValue === "false" ? false : true;
  } catch (error) {
    import_logger.PublicLogger.error(error);
  }
  const iFrameCheck = (0, import_inIframe.inIframe)();
  if ((_a = config.editButton.exclude) == null ? void 0 : _a.find(
    (exclude) => exclude === "outsideLivePreviewPortal"
  )) {
    return false;
  }
  if (iFrameCheck && ((_b = config.editButton.exclude) == null ? void 0 : _b.find(
    (exclude) => exclude === "insideLivePreviewPortal"
  ))) {
    return false;
  } else if (iFrameCheck) {
    if (config.windowType === "builder") {
      return false;
    }
    return true;
  }
  return true;
}
function toggleEditButtonElement() {
  var _a;
  const render = shouldRenderEditButton();
  const exists = doesEditButtonExist();
  if (render && !exists) {
    LivePreviewEditButton.livePreviewEditButton = new LivePreviewEditButton();
  } else if (!render && exists) {
    (_a = LivePreviewEditButton.livePreviewEditButton) == null ? void 0 : _a.destroy();
  }
}
function doesEditButtonExist() {
  return document.getElementById(import_editButton2.EDIT_BUTTON_TOOLTIP_ID) !== null;
}
var LivePreviewEditButton = class {
  constructor() {
    this.tooltip = null;
    this.typeOfCurrentChild = "singular";
    this.tooltipChild = {
      singular: null,
      multiple: null
    };
    this.createCslpTooltip = this.createCslpTooltip.bind(this);
    this.updateTooltipPosition = this.updateTooltipPosition.bind(this);
    this.addEditStyleOnHover = this.addEditStyleOnHover.bind(this);
    this.scrollHandler = this.scrollHandler.bind(this);
    this.generateRedirectUrl = this.generateRedirectUrl.bind(this);
    this.linkClickHandler = this.linkClickHandler.bind(this);
    this.destroy = this.destroy.bind(this);
    if (this.createCslpTooltip()) {
      this.updateTooltipPosition();
      window.addEventListener("scroll", this.updateTooltipPosition);
      window.addEventListener("mouseover", this.addEditStyleOnHover);
    }
  }
  createCslpTooltip() {
    const editButton = import_configManager.default.get().editButton;
    if (!document.getElementById(import_editButton2.EDIT_BUTTON_TOOLTIP_ID) && editButton.enable && shouldRenderEditButton()) {
      const tooltip = document.createElement("button");
      this.tooltip = tooltip;
      this.tooltip.classList.add((0, import_editButton.cslpTagStyles)()["cslp-tooltip"]);
      this.tooltip.setAttribute("data-test-id", "cs-cslp-tooltip");
      this.tooltip.id = import_editButton2.EDIT_BUTTON_TOOLTIP_ID;
      window.document.body.insertAdjacentElement(
        "beforeend",
        this.tooltip
      );
      this.tooltipChild.singular = createSingularEditButton(
        this.scrollHandler
      );
      this.tooltipChild.multiple = createMultipleEditButton(
        this.scrollHandler,
        this.linkClickHandler
      );
      this.tooltip.appendChild(this.tooltipChild.singular);
      return true;
    }
    return false;
  }
  updateTooltipPosition() {
    var _a;
    const editButton = import_configManager.default.get().editButton;
    const elements = import_configManager.default.get().elements;
    if (!elements.highlightedElement || !this.tooltip) return false;
    const currentRectOfElement = elements.highlightedElement.getBoundingClientRect();
    const currentRectOfParentOfElement = (_a = this.tooltip.parentElement) == null ? void 0 : _a.getBoundingClientRect();
    if (currentRectOfElement && currentRectOfParentOfElement) {
      const editButtonPosition = getEditButtonPosition(
        elements.highlightedElement,
        editButton.position
      );
      let upperBoundOfTooltip = editButtonPosition.upperBoundOfTooltip;
      const leftBoundOfTooltip = editButtonPosition.leftBoundOfTooltip;
      if (upperBoundOfTooltip < 0) {
        if (currentRectOfElement.top < 0)
          upperBoundOfTooltip = currentRectOfElement.top;
        else upperBoundOfTooltip = 0;
      }
      this.tooltip.style.top = upperBoundOfTooltip + "px";
      this.tooltip.style.zIndex = elements.highlightedElement.style.zIndex || "200";
      this.tooltip.style.left = leftBoundOfTooltip + "px";
      if (this.tooltipChild.singular && this.tooltipChild.multiple) {
        if (elements.highlightedElement.hasAttribute("href") && this.typeOfCurrentChild !== "multiple") {
          this.tooltip.innerHTML = "";
          this.tooltip.appendChild(this.tooltipChild.multiple);
          this.typeOfCurrentChild = "multiple";
        } else if (this.typeOfCurrentChild !== "singular") {
          this.tooltip.innerHTML = "";
          this.tooltip.appendChild(this.tooltipChild.singular);
          this.typeOfCurrentChild = "singular";
        }
      }
      return true;
    }
    return false;
  }
  addEditStyleOnHover(e) {
    const updateTooltipPosition = ({
      cslpTag,
      highlightedElement
    }) => {
      var _a, _b;
      if (this.updateTooltipPosition()) {
        (_a = this.tooltip) == null ? void 0 : _a.setAttribute("current-data-cslp", cslpTag);
        (_b = this.tooltip) == null ? void 0 : _b.setAttribute(
          "current-href",
          highlightedElement.getAttribute("href") ?? ""
        );
      }
    };
    const editButton = import_configManager.default.get().editButton;
    const windowType = import_configManager.default.get().windowType;
    if ((windowType === import_types.ILivePreviewWindowType.PREVIEW || windowType === import_types.ILivePreviewWindowType.INDEPENDENT) && editButton.enable) {
      (0, import_cslp.addCslpOutline)(e, updateTooltipPosition);
    }
  }
  scrollHandler() {
    var _a;
    if (!this.tooltip) return;
    const cslpTag = this.tooltip.getAttribute("current-data-cslp");
    if (cslpTag) {
      const { content_type_uid, entry_uid, locale, variant, fieldPathWithIndex } = (0, import_cslp.extractDetailsFromCslp)(cslpTag);
      if ((0, import_inIframe.inIframe)()) {
        (_a = import_livePreviewEventManager.default) == null ? void 0 : _a.send("scroll", {
          field: fieldPathWithIndex,
          content_type_uid,
          entry_uid,
          variant,
          locale
        });
      } else {
        try {
          const redirectUrl = this.generateRedirectUrl(
            content_type_uid,
            locale,
            entry_uid,
            variant,
            fieldPathWithIndex
          );
          window.open(redirectUrl, "_blank");
        } catch (error) {
          import_logger.PublicLogger.error(error);
        }
      }
    }
  }
  /**
   * Generates the redirect URL for editing a specific entry in the Live Preview SDK.
   * @param content_type_uid - The UID of the content type.
   * @param locale - The locale of the entry (default: "en-us").
   * @param entry_uid - The UID of the entry.
   * @param preview_field - The field to be previewed.
   * @returns The redirect URL for editing the entry.
   */
  generateRedirectUrl(content_type_uid, locale = "en-us", entry_uid, variant, preview_field) {
    const config = import_configManager.default.get();
    if (!config.stackDetails.apiKey) {
      throw `To use edit tags, you must provide the stack API key. Specify the API key while initializing the Live Preview SDK.

                ContentstackLivePreview.init({
                    ...,
                    stackDetails: {
                        apiKey: 'your-api-key'
                    },
                    ...
                })`;
    }
    if (!config.stackDetails.environment) {
      throw `To use edit tags, you must provide the preview environment. Specify the preview environment while initializing the Live Preview SDK.

                ContentstackLivePreview.init({
                    ...,
                    stackDetails: {
                        environment: 'Your-environment'
                    },
                    ...
                })`;
    }
    const protocol = String(config.clientUrlParams.protocol);
    const host = String(config.clientUrlParams.host);
    const port = String(config.clientUrlParams.port);
    const environment = String(config.stackDetails.environment);
    const branch = String(config.stackDetails.branch || "main");
    let urlHash = `!/stack/${config.stackDetails.apiKey}/content-type/${content_type_uid}/${locale ?? "en-us"}/entry/${entry_uid}`;
    if (variant) {
      urlHash += `/variant/${variant}/edit`;
    } else {
      urlHash += `/edit`;
    }
    const url = new URL(`${protocol}://${host}`);
    url.port = port;
    url.hash = urlHash;
    if (config.stackDetails.branch) {
      url.searchParams.append("branch", branch);
    }
    url.searchParams.append("preview-field", preview_field);
    url.searchParams.append("preview-locale", locale ?? "en-us");
    url.searchParams.append("preview-environment", environment);
    return `${url.origin}/${url.hash}${url.search}`;
  }
  linkClickHandler() {
    if (!this.tooltip) return;
    const hrefAttribute = this.tooltip.getAttribute("current-href");
    if (hrefAttribute) {
      window.location.assign(hrefAttribute);
    }
  }
  /**
   * Destroys the edit button by removing event listeners and removing the tooltip.
   */
  destroy() {
    var _a;
    window.removeEventListener("scroll", this.updateTooltipPosition);
    window.removeEventListener("mouseover", this.addEditStyleOnHover);
    (_a = this.tooltip) == null ? void 0 : _a.remove();
  }
};
LivePreviewEditButton.livePreviewEditButton = null;
(0, import_signals.effect)(function handleWindowTypeChange() {
  if (typeof window === "undefined") return;
  import_configManager.default.get().windowType;
  if (LivePreviewEditButton && !(0, import_utils.isOpeningInTimeline)()) {
    toggleEditButtonElement();
  }
});
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  LivePreviewEditButton,
  createMultipleEditButton,
  createSingularEditButton,
  doesEditButtonExist,
  getEditButtonPosition,
  shouldRenderEditButton,
  toggleEditButtonElement
});
//# sourceMappingURL=editButton.cjs.map