import "../chunk-5WRI5ZAA.js";

// src/visualBuilder/index.ts
import { signal } from "@preact/signals";
import { inIframe } from "../common/inIframe.js";
import Config from "../configManager/configManager.js";
import {
  useHistoryPostMessageEvent,
  useOnEntryUpdatePostMessageEvent
} from "../livePreview/eventManager/postMessageEvent.hooks.js";
import {
  ILivePreviewModeConfig,
  ILivePreviewWindowType
} from "../types/types.js";
import { generateStartEditingButton } from "./generators/generateStartEditingButton.js";
import { addFocusOverlay } from "./generators/generateOverlay.js";
import { getEntryIdentifiersInCurrentPage } from "./utils/getEntryIdentifiersInCurrentPage.js";
import visualBuilderPostMessage from "./utils/visualBuilderPostMessage.js";
import { VisualBuilderPostMessageEvents } from "./utils/types/postMessage.types.js";
import { setup } from "goober";
import { debounce, isEqual } from "lodash-es";
import { h } from "preact";
import { extractDetailsFromCslp } from "../cslp/index.js";
import initUI from "./components/index.js";
import { useDraftFieldsPostMessageEvent } from "./eventManager/useDraftFieldsPostMessageEvent.js";
import { useHideFocusOverlayPostMessageEvent } from "./eventManager/useHideFocusOverlayPostMessageEvent.js";
import { useScrollToField } from "./eventManager/useScrollToField.js";
import { useVariantFieldsPostMessageEvent } from "./eventManager/useVariantsPostMessageEvent.js";
import {
  generateEmptyBlocks,
  removeEmptyBlocks
} from "./generators/generateEmptyBlock.js";
import { addEventListeners, removeEventListeners } from "./listeners/index.js";
import { addKeyboardShortcuts } from "./listeners/keyboardShortcuts.js";
import { FieldSchemaMap } from "./utils/fieldSchemaMap.js";
import { isFieldDisabled } from "./utils/isFieldDisabled.js";
import {
  updateFocussedState,
  updateFocussedStateOnMutation
} from "./utils/updateFocussedState.js";
import { useHighlightCommentIcon } from "./eventManager/useHighlightCommentIcon.js";
import { updateHighlightedCommentIconPosition } from "./generators/generateHighlightedComment.js";
import {
  updateCollabIconPosition,
  updatePopupPositions,
  updateSuggestionListPosition
} from "./generators/generateThread.js";
import { useRecalculateVariantDataCSLPValues } from "./eventManager/useRecalculateVariantDataCSLPValues.js";
import { VB_EmptyBlockParentClass } from "../index.js";
import { useCollab } from "./eventManager/useCollab.js";
import {
  handleMissingThreads,
  processThreadsBatch,
  filterUnrenderedThreads,
  clearThreadStatus
} from "./generators/generateThread.js";
var threadsPayload = [];
var _VisualBuilder = class _VisualBuilder {
  constructor() {
    this.customCursor = null;
    this.overlayWrapper = null;
    this.visualBuilderContainer = null;
    this.focusedToolbar = null;
    this.scrollEventHandler = () => {
      updateCollabIconPosition();
      updatePopupPositions();
      updateSuggestionListPosition();
      updateHighlightedCommentIconPosition();
    };
    this.resizeEventHandler = () => {
      const previousSelectedEditableDOM = _VisualBuilder.VisualBuilderGlobalState.value.previousSelectedEditableDOM;
      updateHighlightedCommentIconPosition();
      updateCollabIconPosition();
      updatePopupPositions();
      updateSuggestionListPosition();
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
        addFocusOverlay(entry.target, this.overlayWrapper);
      } else if (editableElement) {
        this.handlePositionChange(editableElement);
      }
      const cslpData = editableElement && editableElement.getAttribute("data-cslp");
      if (!editableElement || !cslpData) {
        return;
      }
      const fieldMetadata = extractDetailsFromCslp(cslpData);
      FieldSchemaMap.getFieldSchema(
        fieldMetadata.content_type_uid,
        fieldMetadata.fieldPath
      ).then((fieldSchema) => {
        if (!fieldSchema) {
          return;
        }
        const { isDisabled } = isFieldDisabled(fieldSchema, {
          editableElement,
          fieldMetadata
        });
        if (isDisabled) {
          addFocusOverlay(
            editableElement,
            this.overlayWrapper,
            isDisabled
          );
        }
      });
    });
    this.mutationObserver = new MutationObserver(
      debounce(
        async () => {
          updateFocussedStateOnMutation(
            this.overlayWrapper,
            this.focusedToolbar,
            this.visualBuilderContainer,
            this.resizeObserver
          );
          const emptyBlockParents = Array.from(
            document.querySelectorAll(`.${VB_EmptyBlockParentClass}`)
          );
          const previousEmptyBlockParents = _VisualBuilder.VisualBuilderGlobalState.value.previousEmptyBlockParents;
          if (!isEqual(emptyBlockParents, previousEmptyBlockParents)) {
            const noMoreEmptyBlockParent = previousEmptyBlockParents.filter(
              (x) => !emptyBlockParents.includes(x)
            );
            const newEmptyBlockParent = emptyBlockParents.filter(
              (x) => !previousEmptyBlockParents.includes(x)
            );
            removeEmptyBlocks(noMoreEmptyBlockParent);
            await generateEmptyBlocks(newEmptyBlockParent);
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
    this.threadMutationObserver = new MutationObserver(
      debounce(() => {
        const container = document.querySelector(
          ".visual-builder__container"
        );
        if (container && threadsPayload) {
          const unrenderedThreads = filterUnrenderedThreads(threadsPayload);
          if (unrenderedThreads.length > 0) {
            processThreadsBatch(threadsPayload).then(
              (missingThreadIds) => {
                missingThreadIds.forEach(clearThreadStatus);
                if (missingThreadIds.length > 0) {
                  handleMissingThreads({
                    payload: { isElementPresent: false },
                    threadUids: missingThreadIds
                  });
                }
              }
            );
          }
          threadsPayload = [];
        }
      }, 1e3)
    );
    // TODO: write test cases
    this.destroy = () => {
      window.removeEventListener("resize", this.resizeEventHandler);
      window.removeEventListener("scroll", this.scrollEventHandler);
      removeEventListeners({
        overlayWrapper: this.overlayWrapper,
        visualBuilderContainer: this.visualBuilderContainer,
        previousSelectedEditableDOM: _VisualBuilder.VisualBuilderGlobalState.value.previousSelectedEditableDOM,
        focusedToolbar: this.focusedToolbar,
        resizeObserver: this.resizeObserver,
        customCursor: this.customCursor
      });
      this.resizeObserver.disconnect();
      this.mutationObserver.disconnect();
      this.threadMutationObserver.disconnect();
      _VisualBuilder.VisualBuilderGlobalState.value = {
        previousSelectedEditableDOM: null,
        previousHoveredTargetDOM: null,
        previousEmptyBlockParents: [],
        focusFieldValue: null,
        focusFieldReceivedInput: false,
        audienceMode: false,
        locale: "en-us",
        variant: null,
        focusElementObserver: null,
        referenceParentMap: {},
        isFocussed: false
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
    initUI({
      resizeObserver: this.resizeObserver
    });
    setup(h);
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
    const config = Config.get();
    if (!config.enable || config.mode < ILivePreviewModeConfig.BUILDER) {
      return;
    }
    (_a = visualBuilderPostMessage) == null ? void 0 : _a.send("init", {
      isSSR: config.ssr,
      href: window.location.href
    }).then((data) => {
      var _a2, _b;
      const {
        windowType = ILivePreviewWindowType.BUILDER,
        stackDetails,
        collab
      } = data || {};
      Config.set("windowType", windowType);
      Config.set(
        "stackDetails.masterLocale",
        (stackDetails == null ? void 0 : stackDetails.masterLocale) || "en-us"
      );
      if (collab) {
        Config.set("collab.enable", collab.enable);
        Config.set("collab.isFeedbackMode", collab.isFeedbackMode);
        Config.set("collab.inviteMetadata", collab.inviteMetadata);
      }
      if (collab == null ? void 0 : collab.payload) {
        threadsPayload = collab == null ? void 0 : collab.payload;
      }
      addEventListeners({
        overlayWrapper: this.overlayWrapper,
        visualBuilderContainer: this.visualBuilderContainer,
        previousSelectedEditableDOM: _VisualBuilder.VisualBuilderGlobalState.value.previousSelectedEditableDOM,
        focusedToolbar: this.focusedToolbar,
        resizeObserver: this.resizeObserver,
        customCursor: this.customCursor
      });
      this.threadMutationObserver.observe(document.body, {
        childList: true,
        subtree: true,
        attributes: false
      });
      useHistoryPostMessageEvent();
      useCollab();
      if (windowType === ILivePreviewWindowType.BUILDER) {
        addKeyboardShortcuts({
          overlayWrapper: this.overlayWrapper,
          visualBuilderContainer: this.visualBuilderContainer,
          focusedToolbar: this.focusedToolbar,
          resizeObserver: this.resizeObserver
        });
        useScrollToField();
        useHighlightCommentIcon();
        this.mutationObserver.observe(document.body, {
          childList: true,
          subtree: true
        });
        (_a2 = visualBuilderPostMessage) == null ? void 0 : _a2.on(
          VisualBuilderPostMessageEvents.GET_ALL_ENTRIES_IN_CURRENT_PAGE,
          getEntryIdentifiersInCurrentPage
        );
        (_b = visualBuilderPostMessage) == null ? void 0 : _b.send(
          VisualBuilderPostMessageEvents.SEND_VARIANT_AND_LOCALE
        );
        useHideFocusOverlayPostMessageEvent({
          overlayWrapper: this.overlayWrapper,
          visualBuilderContainer: this.visualBuilderContainer,
          focusedToolbar: this.focusedToolbar,
          resizeObserver: this.resizeObserver
        });
        useOnEntryUpdatePostMessageEvent();
        useRecalculateVariantDataCSLPValues();
        useDraftFieldsPostMessageEvent();
        useVariantFieldsPostMessageEvent();
      }
    }).catch(() => {
      if (!inIframe()) {
        generateStartEditingButton();
      }
    });
  }
  handlePositionChange(editableElement) {
    updateFocussedState({
      editableElement,
      visualBuilderContainer: this.visualBuilderContainer,
      overlayWrapper: this.overlayWrapper,
      focusedToolbar: this.focusedToolbar,
      resizeObserver: this.resizeObserver
    });
  }
};
_VisualBuilder.VisualBuilderGlobalState = signal({
  previousSelectedEditableDOM: null,
  previousHoveredTargetDOM: null,
  previousEmptyBlockParents: [],
  focusFieldValue: null,
  focusFieldReceivedInput: false,
  audienceMode: false,
  locale: Config.get().stackDetails.masterLocale || "en-us",
  variant: null,
  focusElementObserver: null,
  referenceParentMap: {},
  isFocussed: false
});
var VisualBuilder = _VisualBuilder;
export {
  VisualBuilder
};
//# sourceMappingURL=index.js.map