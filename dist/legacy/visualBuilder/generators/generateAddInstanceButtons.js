import "../../chunk-5WRI5ZAA.js";

// src/visualBuilder/generators/generateAddInstanceButtons.tsx
import { render } from "preact";
import AddInstanceButtonComponent from "../components/addInstanceButton.js";
import { jsx } from "preact/jsx-runtime";
function generateAddInstanceButton({
  fieldSchema,
  value,
  onClick,
  label
}) {
  const wrapper = document.createDocumentFragment();
  render(
    /* @__PURE__ */ jsx(
      AddInstanceButtonComponent,
      {
        value,
        label,
        onClick,
        fieldSchema
      }
    ),
    wrapper
  );
  const button = wrapper.children[0];
  return button;
}
function getAddInstanceButtons(visualBuilderContainer, getAllButtons = false) {
  const buttons = visualBuilderContainer.getElementsByClassName(
    "visual-builder__add-button"
  );
  if (getAllButtons) {
    return Array.from(buttons);
  }
  if (buttons.length < 2) {
    return null;
  }
  const previousButton = buttons[0];
  const nextButton = buttons[1];
  return [previousButton, nextButton];
}
export {
  generateAddInstanceButton,
  getAddInstanceButtons
};
//# sourceMappingURL=generateAddInstanceButtons.js.map