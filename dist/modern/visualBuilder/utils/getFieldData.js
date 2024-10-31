import "../../chunk-5WRI5ZAA.js";

// src/visualBuilder/utils/getFieldData.ts
import visualBuilderPostMessage from "./visualBuilderPostMessage.js";
import { VisualBuilderPostMessageEvents } from "./types/postMessage.types.js";
import { hasPostMessageError } from "./errorHandling.js";
async function getFieldData(fieldMetadata, entryPath) {
  const data = await visualBuilderPostMessage?.send(
    VisualBuilderPostMessageEvents.GET_FIELD_DATA,
    { fieldMetadata, entryPath: entryPath ?? "" }
  );
  if (hasPostMessageError(data)) {
    return "";
  }
  return data?.fieldData;
}
export {
  getFieldData
};
//# sourceMappingURL=getFieldData.js.map