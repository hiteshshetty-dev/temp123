import ContentstackLivePreview$1 from './preview/contentstack-live-preview-HOC.js';
import { IStackSdk as IStackSdk$1 } from './types/types.js';
import LightLivePreviewHoC from './light-sdk.js';
import './livePreview/types/onEntryChangeCallback.type.js';
import './visualBuilder/types/collab.types.js';

type IStackSdk = IStackSdk$1;
declare const ContentstackLivePreview: typeof LightLivePreviewHoC | typeof ContentstackLivePreview$1;
declare const VB_EmptyBlockParentClass = "visual-builder__empty-block-parent";

export { type IStackSdk, VB_EmptyBlockParentClass, ContentstackLivePreview as default };
