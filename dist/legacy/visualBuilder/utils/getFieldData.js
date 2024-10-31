import "../../chunk-5WRI5ZAA.js";

// src/visualBuilder/utils/getFieldData.ts
import visualBuilderPostMessage from "./visualBuilderPostMessage.js";
import { VisualBuilderPostMessageEvents } from "./types/postMessage.types.js";
import { hasPostMessageError } from "./errorHandling.js";
async function getFieldData(fieldMetadata, entryPath) {
  var _a;
  const data = await ((_a = visualBuilderPostMessage) == null ? void 0 : _a.send(
    VisualBuilderPostMessageEvents.GET_FIELD_DATA,
    { fieldMetadata, entryPath: entryPath ?? "" }
  ));
  if (hasPostMessageError(data)) {
    return "";
  }
  return data == null ? void 0 : data.fieldData;
}
export {
  getFieldData
};
//# sourceMappingURL=getFieldData.js.map