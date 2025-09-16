import ContentstackLivePreviewHOC from "./preview/contentstack-live-preview-HOC";
import { IStackSdk as ExternalStackSdkType } from "./types/types";
import LightLivePreviewHoC from "./light-sdk";
export type IStackSdk = ExternalStackSdkType;
declare const ContentstackLivePreview: typeof ContentstackLivePreviewHOC | typeof LightLivePreviewHoC;
export declare const VB_EmptyBlockParentClass = "visual-builder__empty-block-parent";
export default ContentstackLivePreview;
//# sourceMappingURL=index.d.ts.map