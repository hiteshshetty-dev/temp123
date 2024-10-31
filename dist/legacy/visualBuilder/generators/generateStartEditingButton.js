import "../../chunk-5WRI5ZAA.js";

// src/visualBuilder/generators/generateStartEditingButton.tsx
import { render } from "preact";
import { PublicLogger } from "../../logger/logger.js";
import StartEditingButtonComponent from "../components/startEditingButton.js";
import { jsx } from "preact/jsx-runtime";
function generateStartEditingButton(visualBuilderContainer) {
  if (!visualBuilderContainer) {
    PublicLogger.warn("Visual builder overlay not found.");
    return;
  }
  const wrapper = document.createDocumentFragment();
  render(/* @__PURE__ */ jsx(StartEditingButtonComponent, {}), wrapper);
  visualBuilderContainer == null ? void 0 : visualBuilderContainer.appendChild(wrapper);
  const startEditingButton = document.querySelector(
    ".visual-builder__start-editing-btn"
  );
  return startEditingButton;
}
export {
  generateStartEditingButton
};
//# sourceMappingURL=generateStartEditingButton.js.map