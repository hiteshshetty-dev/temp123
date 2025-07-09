import "../../chunk-5WRI5ZAA.js";

// src/visualBuilder/generators/generateStartEditingButton.tsx
import { render } from "preact";
import StartEditingButtonComponent from "../components/startEditingButton.js";
import { jsx } from "preact/jsx-runtime";
function generateStartEditingButton() {
  const existingButton = document.querySelector(
    ".visual-builder__start-editing-btn"
  );
  if (existingButton) {
    return existingButton;
  }
  const wrapper = document.createDocumentFragment();
  render(/* @__PURE__ */ jsx(StartEditingButtonComponent, {}), wrapper);
  if (wrapper.children.length === 0) {
    return void 0;
  }
  document.body.appendChild(wrapper);
  const startEditingButton = document.querySelector(
    ".visual-builder__start-editing-btn"
  );
  return startEditingButton;
}
export {
  generateStartEditingButton
};
//# sourceMappingURL=generateStartEditingButton.js.map