import "../../chunk-5WRI5ZAA.js";

// src/visualBuilder/utils/pasteAsPlainText.ts
import { debounce } from "lodash-es";
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
  pasteAsPlainText
};
//# sourceMappingURL=pasteAsPlainText.js.map