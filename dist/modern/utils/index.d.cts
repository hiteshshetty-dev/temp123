export { addLivePreviewQueryTags } from './addLivePreviewQueryTags.cjs';

declare function hasWindow(): boolean;

declare function addParamsToUrl(): void;
declare function isOpeningInTimeline(): boolean;
declare function isOpenInBuilder(): boolean;
declare function isOpenInPreviewShare(): boolean;

export { addParamsToUrl, hasWindow, isOpenInBuilder, isOpenInPreviewShare, isOpeningInTimeline };
