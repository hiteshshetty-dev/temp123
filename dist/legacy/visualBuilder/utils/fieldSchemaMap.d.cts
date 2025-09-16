import { ISchemaFieldMap, ISchemaIndividualFieldMap } from './types/index.types.cjs';
import '../../cms/types/contentTypeSchema.types.cjs';

/**
 * Represents a cache for field schemas. Field schemas are
 * used to easily get the field schema based on the field
 * Cslp.
 */
declare class FieldSchemaMap {
    private static fieldSchema;
    private static fieldSchemaPromise;
    private static fetchFieldSchema;
    /**
     * Retrieves the schema field map for a given content type and field Cslp.
     * @param contentTypeUid - The unique identifier of the content type.
     * @param fieldCslp - The Cslp of the field.
     * @returns The schema field map.
     */
    static getFieldSchema(contentTypeUid: string, fieldCslp: string): Promise<ISchemaFieldMap>;
    static hasFieldSchema(contentTypeUid: string, fieldCslp: string): boolean;
    /**
     * Checks if two field schemas are equal.
     * @param firstFieldSchema - The first field schema to compare.
     * @param secondFieldSchema - The second field schema to compare.
     * @returns True if the field schemas are equal, false otherwise.
     */
    static areFieldSchemaEqual(firstFieldSchema: ISchemaFieldMap, secondFieldSchema: ISchemaFieldMap): boolean;
    /**
     * Sets the field schema for a given content type.
     * @param contentTypeUid The unique identifier of the content type.
     * @param fieldSchemaMap The map of individual field schemas.
     */
    static setFieldSchema(contentTypeUid: string, fieldSchemaMap: ISchemaIndividualFieldMap): void;
    /**
     * Clears the field schema cache.
     */
    static clear(): void;
}

export { FieldSchemaMap };
