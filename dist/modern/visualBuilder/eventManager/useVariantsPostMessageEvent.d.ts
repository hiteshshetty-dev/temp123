declare function addVariantFieldClass(variant_uid: string, highlightVariantFields: boolean): void;
declare function removeVariantFieldClass(onlyHighlighted?: boolean): void;
declare function setAudienceMode(mode: boolean): void;
declare function setVariant(uid: string | null): void;
declare function setLocale(locale: string): void;
declare function useVariantFieldsPostMessageEvent(): void;

export { addVariantFieldClass, removeVariantFieldClass, setAudienceMode, setLocale, setVariant, useVariantFieldsPostMessageEvent };
