declare function addVariantFieldClass(variant_uid: string): void;
declare const debounceAddVariantFieldClass: (variant_uid: string) => void;
declare function removeVariantFieldClass(onlyHighlighted?: boolean): void;
declare function setAudienceMode(mode: boolean): void;
declare function setVariant(uid: string | null): void;
declare function setLocale(locale: string): void;
declare function setHighlightVariantFields(highlight: boolean): void;
declare function setVariantOrder(variantOrder: string[]): void;
interface GetHighlightVariantFieldsStatusResponse {
    highlightVariantFields: boolean;
}
declare function getHighlightVariantFieldsStatus(): Promise<GetHighlightVariantFieldsStatusResponse>;
declare function useVariantFieldsPostMessageEvent({ isSSR }: {
    isSSR: boolean;
}): void;

export { addVariantFieldClass, debounceAddVariantFieldClass, getHighlightVariantFieldsStatus, removeVariantFieldClass, setAudienceMode, setHighlightVariantFields, setLocale, setVariant, setVariantOrder, useVariantFieldsPostMessageEvent };
