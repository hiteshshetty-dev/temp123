import "../../chunk-5WRI5ZAA.js";

// src/visualBuilder/utils/getCamelCaseStyles.ts
import { camelCase } from "lodash-es";
function getCamelCaseStyles(styles) {
  return Object.keys(styles).reduce((acc, key) => {
    acc[camelCase(key)] = styles[key];
    return acc;
  }, {});
}
export {
  getCamelCaseStyles as default
};
//# sourceMappingURL=getCamelCaseStyles.js.map