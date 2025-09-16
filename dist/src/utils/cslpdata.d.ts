export interface CslpData {
    entry_uid: string;
    content_type_uid: string;
    variant?: string;
    cslpValue: string;
    locale: string;
    fieldPath: string;
}
/**
 * Extracts details from a CSLP value string.
 * @param cslpValue The CSLP value string to extract details from.
 * @returns An object containing the extracted details.
 */
export declare function extractDetailsFromCslp(cslpValue: string): CslpData;
//# sourceMappingURL=cslpdata.d.ts.map