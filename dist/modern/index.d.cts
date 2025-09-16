import ContentstackLivePreview$1 from './preview/contentstack-live-preview-HOC.cjs';
import { IStackSdk as IStackSdk$1 } from './types/types.cjs';
import LightLivePreviewHoC from './light-sdk.cjs';
import './livePreview/types/onEntryChangeCallback.type.cjs';
import './visualBuilder/types/collab.types.cjs';

type IStackSdk = IStackSdk$1;
declare const ContentstackLivePreview: typeof LightLivePreviewHoC | typeof ContentstackLivePreview$1;
declare const VB_EmptyBlockParentClass = "visual-builder__empty-block-parent";

export { type IStackSdk, VB_EmptyBlockParentClass, ContentstackLivePreview as default };
