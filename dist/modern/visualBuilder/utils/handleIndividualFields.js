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
  const expectedFieldInstanceData = Array.isArray(expectedFieldData) ? expectedFieldData.at(fieldMetadata.multipleFieldMetadata.index) : void 0;
  const fieldType = getFieldType(fieldSchema);
  const { isDisabled: disabled } = isFieldDisabled(fieldSchema, eventDetails);
  editableElement.setAttribute(
    VISUAL_BUILDER_FIELD_TYPE_ATTRIBUTE_KEY,
    fieldType
  );
  if (fieldSchema && (fieldSchema?.multiple || fieldSchema?.data_type === "reference" && // @ts-ignore
  fieldSchema?.field_metadata.ref_multiple)) {
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
    if (eventDetails.fieldMetadata.multipleFieldMetadata.index > -1) {
      handleSingleField(
        {
          editableElement,
          visualBuilderContainer,
          resizeObserver: elements.resizeObserver
        },
        { expectedFieldData: expectedFieldInstanceData, disabled }
      );
    }
  } else {
    handleSingleField(
      {
        editableElement,
        visualBuilderContainer,
        resizeObserver: elements.resizeObserver
      },
      { expectedFieldData, disabled }
    );
  }
  function handleSingleField(elements2, config) {
    const { editableElement: editableElement2, visualBuilderContainer: visualBuilderContainer2 } = elements2;
    if (config.disabled) {
      return;
    }
    if (ALLOWED_INLINE_EDITABLE_FIELD.includes(fieldType)) {
      let actualEditableField = editableElement2;
      VisualBuilder.VisualBuilderGlobalState.value.focusFieldValue = actualEditableField?.innerText;
      const elementComputedDisplay = window.getComputedStyle(actualEditableField).display;
      let textContent = editableElement2.innerText || editableElement2.textContent || "";
      if (fieldType === FieldDataType.MULTILINE) {
        textContent = getMultilinePlaintext(actualEditableField);
        actualEditableField.addEventListener("paste", pasteAsPlainText);
      }
      const expectedTextContent = config.expectedFieldData;
      if (textContent !== expectedTextContent || isEllipsisActive(editableElement2)) {
        const pseudoEditableField = generatePseudoEditableElement(
          { editableElement: editableElement2 },
          { textContent: config.expectedFieldData }
        );
        editableElement2.style.visibility = "hidden";
        pseudoEditableField.setAttribute(
          VISUAL_BUILDER_FIELD_TYPE_ATTRIBUTE_KEY,
          fieldType
        );
        visualBuilderContainer2.appendChild(pseudoEditableField);
        actualEditableField = pseudoEditableField;
        if (fieldType === FieldDataType.MULTILINE)
          actualEditableField.addEventListener(
            "paste",
            pasteAsPlainText
          );
        elements2.resizeObserver.observe(pseudoEditableField);
      } else if (elementComputedDisplay === "inline") {
        const onInlineElementInput = throttle(() => {
          const overlayWrapper = visualBuilderContainer2.querySelector(
            ".visual-builder__overlay__wrapper"
          );
          const focusedToolbar = visualBuilderContainer2.querySelector(
            ".visual-builder__focused-toolbar"
          );
          updateFocussedState({
            editableElement: actualEditableField,
            visualBuilderContainer: visualBuilderContainer2,
            overlayWrapper,
            resizeObserver,
            focusedToolbar
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
  const pseudoEditableElement = visualBuilderContainer?.querySelector(
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
  }
}
var pasteAsPlainText = debounce(
  (e) => {
    e.preventDefault();
    const clipboardData = e.clipboardData;
    document.execCommand(
      "inserttext",
      false,
      clipboardData?.getData("text/plain")
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