import { OnEntryChangeCallback, OnEntryChangeConfig, OnEntryChangeCallbackUID } from './livePreview/types/onEntryChangeCallback.type.cjs';
import { IExportedConfig } from './types/types.cjs';
import './visualBuilder/types/collab.types.cjs';

declare class LightLivePreviewHoC {
    private static previewConstructors;
    private static onEntryChangeCallbacks;
    static init(): Promise<{}>;
    private static initializePreview;
    static get hash(): string;
    static get config(): IExportedConfig;
    static isInitialized(): boolean;
    static onEntryChange(callback: OnEntryChangeCallback, config?: OnEntryChangeConfig): OnEntryChangeCallbackUID;
    static onLiveEdit(callback: OnEntryChangeCallback): string;
    static unsubscribeOnEntryChange(): void;
    static getSdkVersion(): string;
}

export { LightLivePreviewHoC as default };
