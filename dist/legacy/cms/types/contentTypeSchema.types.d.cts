interface IContentTypeSchemaCommonData {
    uid: string;
    display_name: string;
    mandatory: boolean;
    max_instance?: number;
    min_instance?: number;
    multiple: boolean;
    non_localizable: boolean;
    unique: boolean;
}
interface ITitleContentTypeSchema extends IContentTypeSchemaCommonData {
    data_type: "text";
    field_metadata: {
        _default: true;
        version: number;
    };
    mandatory: true;
    unique: true;
}
interface ISingleLineTextBoxContentTypeSchema extends IContentTypeSchemaCommonData {
    data_type: "text";
    field_metadata: {
        description: string;
        default_value: string;
        version: number;
    };
    format: string;
    error_messages: {
        format: string;
    };
}
interface IMultiLineTextBoxContentTypeSchema extends IContentTypeSchemaCommonData {
    data_type: "text";
    field_metadata: {
        description: string;
        default_value: string;
        multiline: true;
        version: number;
    };
    format: string;
    error_messages: {
        format: string;
    };
}
interface IHTMLRTEContentTypeSchema extends IContentTypeSchemaCommonData {
    data_type: "text";
    field_metadata: {
        allow_rich_text: true;
        description: string;
        multiline: false;
        rich_text_type: "advanced" | "basic" | "custom";
        options: [];
        version: number;
    };
}
interface IJSONRTEContentTypeSchema extends IContentTypeSchemaCommonData {
    data_type: "json";
    field_metadata: {
        allow_json_rte: true;
        embed_entry: boolean;
        description: string;
        default_value: string;
        multiline: false;
        rich_text_type: "advanced" | "basic" | "custom";
        options: [];
    };
    format: string;
    error_messages: {
        format: string;
    };
    reference_to: ["sys_assets"];
}
interface IURLContentTypeSchema extends IContentTypeSchemaCommonData {
    data_type: "text";
    uid: "url";
    field_metadata: {
        _default: true;
        version: number;
    };
}
interface IMarkdownContentTypeSchema extends IContentTypeSchemaCommonData {
    data_type: "text";
    field_metadata: {
        description: string;
        markdown: true;
        version: number;
    };
}
interface ICustomFieldContentTypeSchema extends IContentTypeSchemaCommonData {
    extension_uid: string;
    field_metadata: {
        extension: true;
        is_asset?: boolean;
    };
    config: Record<string, unknown>;
    data_type: "text" | "number" | "isodate" | "boolean" | "json" | "reference" | "file";
}
interface ISelectContentTypeSchema extends IContentTypeSchemaCommonData {
    data_type: "text";
    display_type: "dropdown" | "radio";
    enum: {
        advanced: boolean;
        choices: {
            value: string;
        }[];
    };
    field_metadata: {
        description: string;
        default_value: string;
        version: number;
    };
}
interface INumberContentTypeSchema extends IContentTypeSchemaCommonData {
    data_type: "number";
    field_metadata: {
        description: string;
        default_value: string;
    };
}
interface IBooleanContentTypeSchema extends IContentTypeSchemaCommonData {
    data_type: "boolean";
    field_metadata: {
        description: string;
        default_value: boolean;
    };
}
interface IDateContentTypeSchema extends IContentTypeSchemaCommonData {
    data_type: "isodate";
    startDate: null | string;
    endDate: null | string;
    field_metadata: {
        description: string;
    };
}
interface IFileContentTypeSchema extends IContentTypeSchemaCommonData {
    data_type: "file";
    extensions: string[];
    field_metadata: {
        description: string;
        rich_text_type: "standard";
    };
}
interface ILinkContentTypeSchema extends IContentTypeSchemaCommonData {
    data_type: "link";
    field_metadata: {
        description: string;
        default_value: {
            title: string;
            url: string;
        };
    };
}
interface IReferenceContentTypeSchema extends IContentTypeSchemaCommonData {
    data_type: "reference";
    reference_to: string[];
    field_metadata: {
        ref_multiple: boolean;
        ref_multiple_content_types: boolean;
    };
}
interface IExperienceContainerContentTypeSchema extends IContentTypeSchemaCommonData {
    data_type: "experience_container";
    field_metadata: {
        experience_uid: string;
        project_uid: string;
        enableDefaultVariation: boolean;
    };
    schema: IContentTypeCommonBlocks[];
}
interface ITaxononmy {
    taxonomy_uid: string;
    non_localizable: boolean;
    mandatory: boolean;
    max_terms: number;
}
interface ITaxanonmyContentTypeSchema extends IContentTypeSchemaCommonData {
    data_type: "taxonomy";
    field_metadata: {
        description: string;
        default_value: string;
        version: number;
    };
    taxanomies: ITaxononmy[];
    format: string;
    error_messages: {
        format: string;
    };
}
type IContentTypeCommonBlocks = ISingleLineTextBoxContentTypeSchema | IMultiLineTextBoxContentTypeSchema | IHTMLRTEContentTypeSchema | IJSONRTEContentTypeSchema | IMarkdownContentTypeSchema | ISelectContentTypeSchema | INumberContentTypeSchema | IBooleanContentTypeSchema | IDateContentTypeSchema | IFileContentTypeSchema | ICustomFieldContentTypeSchema | ILinkContentTypeSchema | IModularBlocksContentTypeSchema | IGroupContentTypeSchema | IReferenceContentTypeSchema | IGlobalFieldContentTypeSchema | IExperienceContainerContentTypeSchema;
type IContentTypeRootBlocks = ISingleLineTextBoxContentTypeSchema | IMultiLineTextBoxContentTypeSchema | IHTMLRTEContentTypeSchema | IJSONRTEContentTypeSchema | IMarkdownContentTypeSchema | ISelectContentTypeSchema | ICustomFieldContentTypeSchema | INumberContentTypeSchema | IBooleanContentTypeSchema | IDateContentTypeSchema | IFileContentTypeSchema | ILinkContentTypeSchema | IModularBlocksContentTypeSchema | IGroupContentTypeSchema | IReferenceContentTypeSchema | IGlobalFieldContentTypeSchema | IExperienceContainerContentTypeSchema | ITitleContentTypeSchema | IURLContentTypeSchema | ITaxanonmyContentTypeSchema;
interface IModularBlockSingleBlock {
    title: string;
    uid: string;
    schema: IContentTypeCommonBlocks[];
}
interface IModularBlocksContentTypeSchema extends IContentTypeSchemaCommonData {
    data_type: "blocks";
    blocks: IModularBlockSingleBlock[];
    field_metadata: {
        instruction: string;
        description: string;
    };
}
interface IGroupContentTypeSchema extends IContentTypeSchemaCommonData {
    data_type: "group";
    field_metadata: {
        description: string;
        instruction: string;
    };
    schema: IContentTypeCommonBlocks[];
}
interface IGlobalFieldContentTypeSchema extends IContentTypeSchemaCommonData {
    data_type: "global_field";
    reference_to: string;
    field_metadata: {
        description: string;
    };
    schema: IContentTypeRootBlocks[];
}
interface IPageSchema {
    created_at: string;
    updated_at: string;
    title: string;
    description: string;
    uid: string;
    _version: number;
    inbuilt_class: false;
    options: {
        is_page: boolean;
        singleton: boolean;
        title: string;
    };
    schema: IContentTypeRootBlocks[];
}

export type { IBooleanContentTypeSchema, IContentTypeCommonBlocks, IContentTypeRootBlocks, ICustomFieldContentTypeSchema, IDateContentTypeSchema, IExperienceContainerContentTypeSchema, IFileContentTypeSchema, IGlobalFieldContentTypeSchema, IGroupContentTypeSchema, IHTMLRTEContentTypeSchema, IJSONRTEContentTypeSchema, ILinkContentTypeSchema, IMarkdownContentTypeSchema, IModularBlockSingleBlock, IModularBlocksContentTypeSchema, IMultiLineTextBoxContentTypeSchema, INumberContentTypeSchema, IPageSchema, IReferenceContentTypeSchema, ISelectContentTypeSchema, ISingleLineTextBoxContentTypeSchema, ITaxanonmyContentTypeSchema, ITaxononmy, ITitleContentTypeSchema, IURLContentTypeSchema };
