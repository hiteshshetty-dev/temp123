import "../chunk-5WRI5ZAA.js";

// src/utils/handlePageTraversal.ts
var handlePageTraversal = () => {
  window.addEventListener("unload", () => {
    const targetURL = document.activeElement.href;
    if (targetURL) {
      window.parent.postMessage(
        {
          from: "live-preview",
          type: "url-change",
          data: {
            targetURL
          }
        },
        "*"
      );
    }
  });
};
export {
  handlePageTraversal
};
//# sourceMappingURL=handlePageTraversal.js.map