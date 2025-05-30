import { IContentTypeRootBlocks, IModularBlockSingleBlock } from '../../../cms/types/contentTypeSchema.types.js';

type ISchemaIndividualFieldMap = Record<string, ISchemaFieldMap>;
type ISchemaFieldMap = (IContentTypeRootBlocks | (IModularBlockSingleBlock & {
    data_type: "block";
    display_name: string;
})) & {
    non_localizable?: boolean;
    multiple?: boolean;
    field_metadata?: {
        updateRestrict?: boolean;
        isUnlinkedVariant?: boolean;
    };
};
interface ITraverseSchemaVisitor {
    should_visit: (fieldSchema: IContentTypeRootBlocks, path: string) => boolean;
    visit: (fieldSchema: IContentTypeRootBlocks, path: string) => void;
    /**
     * A flat list of all the fields with its schema
     */
    fieldMap: ISchemaIndividualFieldMap;
}
declare enum FieldDataType {
    CUSTOM_FIELD = "custom_field",
    MULTILINE = "multiline",
    HTML_RTE = "html_rte",
    MARKDOWN_RTE = "markdown_rte",
    SELECT = "select",
    URL = "url",
    SINGLELINE = "singleline",
    JSON_RTE = "json_rte",
    MODULAR_BLOCK = "modular_block",
    LINK = "link",
    ISODATE = "isodate",
    BOOLEAN = "boolean",
    BLOCK = "block",
    NUMBER = "number",
    REFERENCE = "reference",
    GROUP = "group",
    EXPERIENCE_CONTAINER = "experience_container",
    FILE = "file",
    GLOBAL_FIELD = "global_field",
    TAXONOMY = "taxonomy"
}
interface VisualBuilderEditContext {
    visualBuilderContainer: HTMLDivElement;
    resizeObserver: ResizeObserver;
    lastEditedField: Element | null;
}

export { FieldDataType, type ISchemaFieldMap, type ISchemaIndividualFieldMap, type ITraverseSchemaVisitor, type VisualBuilderEditContext };
