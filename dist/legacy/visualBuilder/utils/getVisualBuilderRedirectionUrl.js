import "../../chunk-5WRI5ZAA.js";

// src/visualBuilder/utils/getVisualBuilderRedirectionUrl.ts
import Config from "../../configManager/configManager.js";
import { extractDetailsFromCslp } from "../../cslp/index.js";
function getVisualBuilderRedirectionUrl() {
  const { stackDetails, clientUrlParams } = Config.get();
  const { branch, apiKey, environment, locale } = stackDetails;
  const { url: appUrl } = clientUrlParams;
  const searchParams = new URLSearchParams();
  if (branch) {
    searchParams.set("branch", branch);
  }
  if (environment) {
    searchParams.set("environment", environment);
  }
  searchParams.set("target-url", window.location.href);
  const elementWithDataCslp = document.querySelector(`[data-cslp]`);
  if (elementWithDataCslp) {
    const cslpData = elementWithDataCslp.getAttribute(
      "data-cslp"
    );
    const { locale: locale2 } = extractDetailsFromCslp(cslpData);
    searchParams.set("locale", locale2);
  } else if (locale) {
    searchParams.set("locale", locale);
  }
  const completeURL = new URL(
    `/#!/stack/${apiKey}/visual-builder?${searchParams.toString()}`,
    appUrl
  );
  return completeURL;
}
export {
  getVisualBuilderRedirectionUrl as default
};
//# sourceMappingURL=getVisualBuilderRedirectionUrl.js.map