import ContentstackLivePreview$1 from './preview/contentstack-live-preview-HOC.js';
import { IStackSdk as IStackSdk$1 } from './types/types.js';
import { OnEntryChangeCallback, OnEntryChangeConfig, OnEntryChangeCallbackUID } from './livePreview/types/onEntryChangeCallback.type.js';
import './visualBuilder/types/collab.types.js';

type IStackSdk = IStackSdk$1;
declare class LightLivePreviewHoC {
    private static previewConstructors;
    private static onEntryChangeCallbacks;
    static init(): Promise<{}>;
    private static initializePreview;
    static get hash(): string;
    static get config(): {};
    static isInitialized(): boolean;
    static onEntryChange(callback: OnEntryChangeCallback, config?: OnEntryChangeConfig): OnEntryChangeCallbackUID;
    static onLiveEdit(callback: OnEntryChangeCallback): string;
    static unsubscribeOnEntryChange(): void;
    static getSdkVersion(): string;
}
declare const ContentstackLivePreview: typeof ContentstackLivePreview$1 | typeof LightLivePreviewHoC;
declare const VB_EmptyBlockParentClass = "visual-builder__empty-block-parent";

export { type IStackSdk, VB_EmptyBlockParentClass, ContentstackLivePreview as default };
