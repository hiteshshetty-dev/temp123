export { addLivePreviewQueryTags } from './addLivePreviewQueryTags.cjs';

declare function hasWindow(): boolean;

declare function addParamsToUrl(): void;
declare function isOpeningInTimeline(): boolean;
declare function isOpenInBuilder(): boolean;

export { addParamsToUrl, hasWindow, isOpenInBuilder, isOpeningInTimeline };
