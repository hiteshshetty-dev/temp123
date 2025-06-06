import { ICollabConfig } from '../visualBuilder/types/collab.types.cjs';

declare interface IEditEntrySearchParams {
    hash?: string;
    entry_uid?: string;
    content_type_uid?: string;
    /**
     * @deprecated pass this value as hash instead
     */
    live_preview?: string;
}
declare interface IClientUrlParams {
    protocol: "http" | "https";
    host: string;
    port: string | number;
    url: string;
}
declare interface IStackSdk {
    live_preview: {
        [key: string]: any;
    } & Partial<IConfig>;
    [key: string]: any;
    environment: string;
}
declare interface IStackDetails {
    apiKey: string;
    environment: string;
    contentTypeUid: string;
    entryUid: string;
    branch: string;
    /**
     * This locale is currently used by the visual builder to
     * redirect to the correct locale if the no data-cslp tag
     * is present in the HTML to extract the locale.
     */
    locale: string;
    masterLocale: string;
}
declare interface IInitStackDetails {
    apiKey: string;
    environment: string;
    branch: string;
    /**
     * This locale is currently used by the visual builder to
     * redirect to the correct locale if the no data-cslp tag
     * is present in the HTML to extract the locale.
     */
    locale: string;
}
declare type ILivePreviewMode = "builder" | "preview";
declare enum ILivePreviewModeConfig {
    PREVIEW = 1,
    BUILDER = 2
}
declare enum ILivePreviewWindowType {
    PREVIEW = "preview",
    PREVIEW_SHARE = "preview-share",
    BUILDER = "builder",
    INDEPENDENT = "independent"
}
declare interface IConfig {
    ssr: boolean;
    enable: boolean;
    /**
     * @default false
     */
    debug: boolean;
    cleanCslpOnProduction: boolean;
    stackDetails: IStackDetails;
    clientUrlParams: IClientUrlParams;
    stackSdk: IStackSdk;
    onChange: () => void;
    runScriptsOnUpdate: boolean;
    windowType: ILivePreviewWindowType;
    hash: string;
    editButton: IConfigEditButton;
    editInVisualBuilderButton: IConfigEditInVisualBuilderButton;
    mode: ILivePreviewModeConfig;
    elements: {
        highlightedElement: HTMLElement | null;
    };
    collab: ICollabConfig["collab"];
}
declare interface IConfigEditInVisualBuilderButton {
    enable: boolean;
    position?: "top-left" | "top-right" | "bottom-left" | "bottom-right";
}
declare interface IConfigEditButton {
    enable: boolean;
    exclude?: ("insideLivePreviewPortal" | "outsideLivePreviewPortal")[];
    includeByQueryParameter?: boolean;
    position?: "top" | "bottom" | "left" | "right" | "top-left" | "top-right" | "top-center" | "bottom-left" | "bottom-right" | "bottom-center";
}
declare interface IInitData {
    ssr: boolean;
    runScriptsOnUpdate: boolean;
    enable: boolean;
    /**
     * @default false
     */
    debug: boolean;
    cleanCslpOnProduction: boolean;
    stackDetails: Partial<IInitStackDetails>;
    clientUrlParams: Partial<Omit<IClientUrlParams, "url">>;
    stackSdk: IStackSdk;
    editButton: IConfigEditButton;
    editInVisualBuilderButton: IConfigEditInVisualBuilderButton;
    mode: ILivePreviewMode;
}
declare interface ILivePreviewMessageCommon {
    from: "live-preview";
}
declare interface IEditButtonPosition {
    upperBoundOfTooltip: number;
    leftBoundOfTooltip: number;
}
interface IVisualBuilderInitEvent {
    windowType: ILivePreviewWindowType;
    stackDetails: {
        masterLocale: string;
    };
    collab?: ICollabConfig["collab"];
}
type IExportedConfig = Pick<IConfig, "ssr" | "enable" | "cleanCslpOnProduction" | "stackDetails" | "clientUrlParams" | "windowType" | "hash" | "editButton" | "mode">;

export { type IClientUrlParams, type IConfig, type IConfigEditButton, type IConfigEditInVisualBuilderButton, type IEditButtonPosition, type IEditEntrySearchParams, type IExportedConfig, type IInitData, type IInitStackDetails, type ILivePreviewMessageCommon, type ILivePreviewMode, ILivePreviewModeConfig, ILivePreviewWindowType, type IStackDetails, type IStackSdk, type IVisualBuilderInitEvent };
