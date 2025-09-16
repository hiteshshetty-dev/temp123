import { CslpData } from '../../cslp/types/cslp.types.cjs';

/**
 * Retrieves the expected field data based on the provided field metadata.
 *
 * @param fieldMetadata The metadata of the field.
 * @param entryPath The path in the entry for which the value must be returned.
 * @returns A promise that resolves to the expected field data as a string.
 */
declare function getFieldData(fieldMetadata: Pick<CslpData, "content_type_uid" | "entry_uid" | "locale">, entryPath?: string): Promise<any>;

export { getFieldData };
