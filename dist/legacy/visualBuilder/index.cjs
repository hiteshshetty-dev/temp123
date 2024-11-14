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

// src/visualBuilder/index.ts
var visualBuilder_exports = {};
__export(visualBuilder_exports, {
  VisualBuilder: () => VisualBuilder
});
module.exports = __toCommonJS(visualBuilder_exports);
var import_signals = require("@preact/signals");
var import_inIframe = require("../common/inIframe.cjs");
var import_configManager = __toESM(require("../configManager/configManager.cjs"), 1);
var import_postMessageEvent = require("../livePreview/eventManager/postMessageEvent.hooks.cjs");
var import_types = require("../types/types.cjs");
var import_generateStartEditingButton = require("./generators/generateStartEditingButton.cjs");
var import_generateOverlay = require("./generators/generateOverlay.cjs");
var import_getEntryIdentifiersInCurrentPage = require("./utils/getEntryIdentifiersInCurrentPage.cjs");
var import_visualBuilderPostMessage = __toESM(require("./utils/visualBuilderPostMessage.cjs"), 1);
var import_postMessage = require("./utils/types/postMessage.types.cjs");
var import_goober = require("goober");
var import_lodash_es = require("lodash-es");
var import_preact = require("preact");
var import_cslp = require("../cslp/index.cjs");
var import_components = __toESM(require("./components/index.cjs"), 1);
var import_useDraftFieldsPostMessageEvent = require("./eventManager/useDraftFieldsPostMessageEvent.cjs");
var import_useHideFocusOverlayPostMessageEvent = require("./eventManager/useHideFocusOverlayPostMessageEvent.cjs");
var import_useScrollToField = require("./eventManager/useScrollToField.cjs");
var import_useVariantsPostMessageEvent = require("./eventManager/useVariantsPostMessageEvent.cjs");
var import_generateEmptyBlock = require("./generators/generateEmptyBlock.cjs");
var import_listeners = require("./listeners/index.cjs");
var import_keyboardShortcuts = require("./listeners/keyboardShortcuts.cjs");
var import_fieldSchemaMap = require("./utils/fieldSchemaMap.cjs");
var import_isFieldDisabled = require("./utils/isFieldDisabled.cjs");
var import_updateFocussedState = require("./utils/updateFocussedState.cjs");
var import_useHighlightCommentIcon = require("./eventManager/useHighlightCommentIcon.cjs");
var import_generateHighlightedComment = require("./generators/generateHighlightedComment.cjs");
var import_useRecalculateVariantDataCSLPValues = require("./eventManager/useRecalculateVariantDataCSLPValues.cjs");
var _VisualBuilder = class _VisualBuilder {
  constructor() {
    this.customCursor = null;
    this.overlayWrapper = null;
    this.visualBuilderContainer = null;
    this.focusedToolbar = null;
    this.scrollEventHandler = () => {
      (0, import_generateHighlightedComment.updateHighlightedCommentIconPosition)();
    };
    this.resizeEventHandler = () => {
      const previousSelectedEditableDOM = _VisualBuilder.VisualBuilderGlobalState.value.previousSelectedEditableDOM;
      (0, import_generateHighlightedComment.updateHighlightedCommentIconPosition)();
      if (previousSelectedEditableDOM) {
        this.handlePositionChange(
          previousSelectedEditableDOM
        );
      }
    };
    this.resizeObserver = new ResizeObserver(([entry]) => {
      const previousSelectedEditableDOM = _VisualBuilder.VisualBuilderGlobalState.value.previousSelectedEditableDOM;
      if (!this.overlayWrapper || !previousSelectedEditableDOM) {
        return;
      }
      if (!entry.target.isSameNode(previousSelectedEditableDOM) && !entry.target.classList.contains(
        "visual-builder__pseudo-editable-element"
      )) {
        return;
      }
      const isPsuedoEditableElement = entry.target.classList.contains(
        "visual-builder__pseudo-editable-element"
      );
      const editableElement = isPsuedoEditableElement ? previousSelectedEditableDOM : entry.target.closest("[data-cslp]");
      if (isPsuedoEditableElement) {
        (0, import_generateOverlay.addFocusOverlay)(entry.target, this.overlayWrapper);
      } else if (editableElement) {
        this.handlePositionChange(editableElement);
      }
      const cslpData = editableElement && editableElement.getAttribute("data-cslp");
      if (!editableElement || !cslpData) {
        return;
      }
      const fieldMetadata = (0, import_cslp.extractDetailsFromCslp)(cslpData);
      import_fieldSchemaMap.FieldSchemaMap.getFieldSchema(
        fieldMetadata.content_type_uid,
        fieldMetadata.fieldPath
      ).then((fieldSchema) => {
        if (!fieldSchema) {
          return;
        }
        const { isDisabled } = (0, import_isFieldDisabled.isFieldDisabled)(fieldSchema, {
          editableElement,
          fieldMetadata
        });
        if (isDisabled) {
          (0, import_generateOverlay.addFocusOverlay)(
            editableElement,
            this.overlayWrapper,
            isDisabled
          );
        }
      });
    });
    this.mutationObserver = new MutationObserver(
      (0, import_lodash_es.debounce)(
        async () => {
          (0, import_updateFocussedState.updateFocussedStateOnMutation)(
            this.overlayWrapper,
            this.focusedToolbar,
            this.visualBuilderContainer,
            this.resizeObserver
          );
          const emptyBlockParents = Array.from(
            document.querySelectorAll(
              ".visual-builder__empty-block-parent"
            )
          );
          const previousEmptyBlockParents = _VisualBuilder.VisualBuilderGlobalState.value.previousEmptyBlockParents;
          if (!(0, import_lodash_es.isEqual)(emptyBlockParents, previousEmptyBlockParents)) {
            const noMoreEmptyBlockParent = previousEmptyBlockParents.filter(
              (x) => !emptyBlockParents.includes(x)
            );
            const newEmptyBlockParent = emptyBlockParents.filter(
              (x) => !previousEmptyBlockParents.includes(x)
            );
            (0, import_generateEmptyBlock.removeEmptyBlocks)(noMoreEmptyBlockParent);
            await (0, import_generateEmptyBlock.generateEmptyBlocks)(newEmptyBlockParent);
            _VisualBuilder.VisualBuilderGlobalState.value = {
              ..._VisualBuilder.VisualBuilderGlobalState.value,
              previousEmptyBlockParents: emptyBlockParents
            };
          }
        },
        100,
        { trailing: true }
      )
    );
    // TODO: write test cases
    this.destroy = () => {
      window.removeEventListener("resize", this.resizeEventHandler);
      window.removeEventListener("scroll", this.scrollEventHandler);
      (0, import_listeners.removeEventListeners)({
        overlayWrapper: this.overlayWrapper,
        visualBuilderContainer: this.visualBuilderContainer,
        previousSelectedEditableDOM: _VisualBuilder.VisualBuilderGlobalState.value.previousSelectedEditableDOM,
        focusedToolbar: this.focusedToolbar,
        resizeObserver: this.resizeObserver,
        customCursor: this.customCursor
      });
      this.resizeObserver.disconnect();
      this.mutationObserver.disconnect();
      _VisualBuilder.VisualBuilderGlobalState.value = {
        previousSelectedEditableDOM: null,
        previousHoveredTargetDOM: null,
        previousEmptyBlockParents: [],
        focusFieldValue: null,
        audienceMode: false,
        locale: "en-us",
        variant: null
      };
      if (this.visualBuilderContainer) {
        window.document.body.removeChild(this.visualBuilderContainer);
      }
      if (this.customCursor) {
        this.customCursor.remove();
      }
      if (this.overlayWrapper) {
        this.overlayWrapper.remove();
      }
      if (this.focusedToolbar) {
        this.focusedToolbar.remove();
      }
      this.customCursor = null;
      this.overlayWrapper = null;
      this.visualBuilderContainer = null;
      this.focusedToolbar = null;
    };
    var _a;
    window.addEventListener("resize", this.resizeEventHandler);
    window.addEventListener("scroll", this.scrollEventHandler);
    (0, import_components.default)({
      resizeObserver: this.resizeObserver
    });
    (0, import_goober.setup)(import_preact.h);
    this.visualBuilderContainer = document.querySelector(
      ".visual-builder__container"
    );
    this.overlayWrapper = document.querySelector(
      ".visual-builder__overlay__wrapper"
    );
    this.customCursor = document.querySelector(".visual-builder__cursor");
    this.focusedToolbar = document.querySelector(
      ".visual-builder__focused-toolbar"
    );
    const config = import_configManager.default.get();
    if (!config.enable || config.mode < import_types.ILivePreviewModeConfig.BUILDER) {
      return;
    }
    (_a = import_visualBuilderPostMessage.default) == null ? void 0 : _a.send("init", {
      isSSR: config.ssr,
      href: window.location.href
    }).then((data) => {
      var _a2, _b;
      const {
        windowType = import_types.ILivePreviewWindowType.BUILDER,
        stackDetails
      } = data || {};
      import_configManager.default.set("windowType", windowType);
      import_configManager.default.set(
        "stackDetails.masterLocale",
        (stackDetails == null ? void 0 : stackDetails.masterLocale) || "en-us"
      );
      (0, import_listeners.addEventListeners)({
        overlayWrapper: this.overlayWrapper,
        visualBuilderContainer: this.visualBuilderContainer,
        previousSelectedEditableDOM: _VisualBuilder.VisualBuilderGlobalState.value.previousSelectedEditableDOM,
        focusedToolbar: this.focusedToolbar,
        resizeObserver: this.resizeObserver,
        customCursor: this.customCursor
      });
      (0, import_keyboardShortcuts.addKeyboardShortcuts)({
        overlayWrapper: this.overlayWrapper,
        visualBuilderContainer: this.visualBuilderContainer,
        focusedToolbar: this.focusedToolbar,
        resizeObserver: this.resizeObserver
      });
      (0, import_useScrollToField.useScrollToField)();
      (0, import_useHighlightCommentIcon.useHighlightCommentIcon)();
      this.mutationObserver.observe(document.body, {
        childList: true,
        subtree: true
      });
      (_a2 = import_visualBuilderPostMessage.default) == null ? void 0 : _a2.on(
        import_postMessage.VisualBuilderPostMessageEvents.GET_ALL_ENTRIES_IN_CURRENT_PAGE,
        import_getEntryIdentifiersInCurrentPage.getEntryIdentifiersInCurrentPage
      );
      (_b = import_visualBuilderPostMessage.default) == null ? void 0 : _b.send(
        import_postMessage.VisualBuilderPostMessageEvents.SEND_VARIANT_AND_LOCALE
      );
      (0, import_useHideFocusOverlayPostMessageEvent.useHideFocusOverlayPostMessageEvent)({
        overlayWrapper: this.overlayWrapper,
        visualBuilderContainer: this.visualBuilderContainer,
        focusedToolbar: this.focusedToolbar,
        resizeObserver: this.resizeObserver
      });
      (0, import_postMessageEvent.useHistoryPostMessageEvent)();
      (0, import_postMessageEvent.useOnEntryUpdatePostMessageEvent)();
      (0, import_useRecalculateVariantDataCSLPValues.useRecalculateVariantDataCSLPValues)();
      (0, import_useDraftFieldsPostMessageEvent.useDraftFieldsPostMessageEvent)();
      (0, import_useVariantsPostMessageEvent.useVariantFieldsPostMessageEvent)();
    }).catch(() => {
      if (!(0, import_inIframe.inIframe)()) {
        (0, import_generateStartEditingButton.generateStartEditingButton)(this.visualBuilderContainer);
      }
    });
  }
  handlePositionChange(editableElement) {
    (0, import_updateFocussedState.updateFocussedState)({
      editableElement,
      visualBuilderContainer: this.visualBuilderContainer,
      overlayWrapper: this.overlayWrapper,
      focusedToolbar: this.focusedToolbar,
      resizeObserver: this.resizeObserver
    });
  }
};
_VisualBuilder.VisualBuilderGlobalState = (0, import_signals.signal)({
  previousSelectedEditableDOM: null,
  previousHoveredTargetDOM: null,
  previousEmptyBlockParents: [],
  focusFieldValue: null,
  audienceMode: false,
  locale: import_configManager.default.get().stackDetails.masterLocale || "en-us",
  variant: null
});
var VisualBuilder = _VisualBuilder;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  VisualBuilder
});
//# sourceMappingURL=index.cjs.map