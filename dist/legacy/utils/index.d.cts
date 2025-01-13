export { addLivePreviewQueryTags } from './addLivePreviewQueryTags.cjs';

declare function hasWindow(): boolean;

declare function addParamsToUrl(): void;
declare function isOpeningInTimeline(): boolean;

export { addParamsToUrl, hasWindow, isOpeningInTimeline };
