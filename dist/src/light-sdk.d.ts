import { OnEntryChangeCallbackUID, OnEntryChangeConfig } from "./livePreview/types/onEntryChangeCallback.type";
import { OnEntryChangeCallback } from "./livePreview/types/onEntryChangeCallback.type";
import { IExportedConfig } from "./types/types";
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
export default LightLivePreviewHoC;
//# sourceMappingURL=light-sdk.d.ts.map