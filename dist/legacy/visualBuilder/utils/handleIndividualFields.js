import "../../chunk-5WRI5ZAA.js";

// src/visualBuilder/utils/handleIndividualFields.ts
import { debounce, throttle } from "lodash-es";
import { VisualBuilder } from "../index.js";
import {
  generatePseudoEditableElement,
  isEllipsisActive
} from "../generators/generatePseudoEditableField.js";
import {
  ALLOWED_INLINE_EDITABLE_FIELD,
  VISUAL_BUILDER_FIELD_TYPE_ATTRIBUTE_KEY
} from "./constants.js";
import { FieldSchemaMap } from "./fieldSchemaMap.js";
import { getFieldData } from "./getFieldData.js";
import { getFieldType } from "./getFieldType.js";
import { handleFieldInput, handleFieldKeyDown } from "./handleFieldMouseDown.js";
import { isFieldDisabled } from "./isFieldDisabled.js";
import {
  handleAddButtonsForMultiple,
  removeAddInstanceButtons
} from "./multipleElementAddButton.js";
import { updateFocussedState } from "./updateFocussedState.js";
import { FieldDataType } from "./types/index.types.js";
import { getMultilinePlaintext } from "./getMultilinePlaintext.js";
import { VisualBuilderPostMessageEvents } from "./types/postMessage.types.js";
import visualBuilderPostMessage from "./visualBuilderPostMessage.js";
async function handleIndividualFields(eventDetails, elements) {
  const { fieldMetadata, editableElement } = eventDetails;
  const { visualBuilderContainer, lastEditedField, resizeObserver } = elements;
  const {
    content_type_uid,
    entry_uid,
    locale,
    fieldPath,
    fieldPathWithIndex
  } = fieldMetadata;
  const [fieldSchema, expectedFieldData] = await Promise.all([
    FieldSchemaMap.getFieldSchema(content_type_uid, fieldPath),
    getFieldData(
      { content_type_uid, entry_uid, locale },
      fieldPathWithIndex
    )
  ]);
  const fieldType = getFieldType(fieldSchema);
  const { isDisabled: disabled } = isFieldDisabled(fieldSchema, eventDetails);
  editableElement.setAttribute(
    VISUAL_BUILDER_FIELD_TYPE_ATTRIBUTE_KEY,
    fieldType
  );
  if (isFieldMultiple(fieldSchema)) {
    if (lastEditedField !== editableElement) {
      const addButtonLabel = fieldSchema.data_type === "blocks" ? (
        // ? `Add ${fieldSchema.display_name ?? "Modular Block"}`
        "Add Section"
      ) : void 0;
      handleAddButtonsForMultiple(
        eventDetails,
        {
          editableElement: eventDetails.editableElement,
          visualBuilderContainer,
          resizeObserver
        },
        {
          fieldSchema,
          expectedFieldData,
          disabled,
          label: addButtonLabel
        }
      );
    }
  }
  !disabled && handleInlineEditing();
  function handleInlineEditing() {
    if (!ALLOWED_INLINE_EDITABLE_FIELD.includes(fieldType)) return;
    const index = Number(fieldMetadata.instance.fieldPathWithIndex.split(".").at(-1));
    const isInstance = Number.isFinite(index);
    if (isFieldMultiple(fieldSchema)) {
      let expectedFieldInstanceData = null;
      if (Array.isArray(expectedFieldData)) {
        if (!isInstance) {
          return;
        }
        if (index >= expectedFieldData.length) {
        } else {
          expectedFieldInstanceData = expectedFieldData.at(index);
        }
      } else {
        expectedFieldInstanceData = expectedFieldData;
      }
      enableInlineEditing(expectedFieldInstanceData);
    } else {
      let expectedFieldInstanceData = null;
      if (isInstance) {
        if (index !== 0) {
          return;
        }
        expectedFieldInstanceData = Array.isArray(expectedFieldData) ? expectedFieldData.at(0) : expectedFieldData;
      }
      enableInlineEditing(expectedFieldInstanceData ?? expectedFieldData);
    }
    function enableInlineEditing(expectedFieldData2) {
      let actualEditableField = editableElement;
      VisualBuilder.VisualBuilderGlobalState.value.focusFieldValue = actualEditableField == null ? void 0 : actualEditableField.innerText;
      const elementComputedDisplay = window.getComputedStyle(actualEditableField).display;
      let textContent = editableElement.innerText || editableElement.textContent || "";
      if (fieldType === FieldDataType.MULTILINE) {
        textContent = getMultilinePlaintext(actualEditableField);
        actualEditableField.addEventListener("paste", pasteAsPlainText);
      }
      const expectedTextContent = expectedFieldData2;
      if (expectedTextContent && textContent !== expectedTextContent || isEllipsisActive(editableElement)) {
        const pseudoEditableField = generatePseudoEditableElement(
          { editableElement },
          { textContent: expectedFieldData2 }
        );
        editableElement.style.visibility = "hidden";
        pseudoEditableField.setAttribute(
          VISUAL_BUILDER_FIELD_TYPE_ATTRIBUTE_KEY,
          fieldType
        );
        visualBuilderContainer.appendChild(pseudoEditableField);
        actualEditableField = pseudoEditableField;
        if (fieldType === FieldDataType.MULTILINE)
          actualEditableField.addEventListener(
            "paste",
            pasteAsPlainText
          );
        elements.resizeObserver.observe(pseudoEditableField);
      } else if (elementComputedDisplay === "inline") {
        const onInlineElementInput = throttle(() => {
          const overlayWrapper = visualBuilderContainer.querySelector(
            ".visual-builder__overlay__wrapper"
          );
          const focusedToolbar = visualBuilderContainer.querySelector(
            ".visual-builder__focused-toolbar"
          );
          updateFocussedState({
            editableElement: actualEditableField,
            visualBuilderContainer,
            overlayWrapper,
            focusedToolbar,
            resizeObserver
          });
        }, 200);
        actualEditableField.addEventListener(
          "input",
          onInlineElementInput
        );
      }
      actualEditableField.setAttribute("contenteditable", "true");
      actualEditableField.addEventListener("input", handleFieldInput);
      actualEditableField.addEventListener("keydown", handleFieldKeyDown);
      actualEditableField.focus();
      return;
    }
  }
}
function isFieldMultiple(fieldSchema) {
  return fieldSchema && (fieldSchema.multiple || fieldSchema.data_type === "reference" && // @ts-ignore
  fieldSchema.field_metadata.ref_multiple);
}
function cleanIndividualFieldResidual(elements) {
  const { overlayWrapper, visualBuilderContainer, focusedToolbar } = elements;
  removeAddInstanceButtons(
    {
      eventTarget: null,
      visualBuilderContainer,
      overlayWrapper
    },
    true
  );
  const previousSelectedEditableDOM = VisualBuilder.VisualBuilderGlobalState.value.previousSelectedEditableDOM;
  if (previousSelectedEditableDOM) {
    previousSelectedEditableDOM.removeAttribute(
      VISUAL_BUILDER_FIELD_TYPE_ATTRIBUTE_KEY
    );
    previousSelectedEditableDOM.removeAttribute("contenteditable");
    previousSelectedEditableDOM.removeEventListener(
      "input",
      handleFieldInput
    );
    previousSelectedEditableDOM.removeEventListener(
      "keydown",
      handleFieldKeyDown
    );
    previousSelectedEditableDOM.removeEventListener(
      "paste",
      pasteAsPlainText
    );
    elements.resizeObserver.unobserve(previousSelectedEditableDOM);
  }
  const pseudoEditableElement = visualBuilderContainer == null ? void 0 : visualBuilderContainer.querySelector(
    ".visual-builder__pseudo-editable-element"
  );
  if (pseudoEditableElement) {
    elements.resizeObserver.unobserve(pseudoEditableElement);
    pseudoEditableElement.removeEventListener("paste", pasteAsPlainText);
    pseudoEditableElement.remove();
    if (previousSelectedEditableDOM) {
      previousSelectedEditableDOM.style.removeProperty(
        "visibility"
      );
    }
  }
  if (focusedToolbar) {
    focusedToolbar.innerHTML = "";
    const toolbarEvents = [VisualBuilderPostMessageEvents.DELETE_INSTANCE, VisualBuilderPostMessageEvents.UPDATE_DISCUSSION_ID];
    toolbarEvents.forEach((event) => {
      var _a, _b;
      (_b = (_a = visualBuilderPostMessage) == null ? void 0 : _a.unregisterEvent) == null ? void 0 : _b.call(_a, event);
    });
  }
}
var pasteAsPlainText = debounce(
  (e) => {
    e.preventDefault();
    const clipboardData = e.clipboardData;
    document.execCommand(
      "inserttext",
      false,
      clipboardData == null ? void 0 : clipboardData.getData("text/plain")
    );
  },
  100,
  { leading: true }
);
export {
  cleanIndividualFieldResidual,
  handleIndividualFields
};
//# sourceMappingURL=handleIndividualFields.js.map