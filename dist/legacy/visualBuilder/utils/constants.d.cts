import { FieldDataType } from './types/index.types.cjs';
import '../../cms/types/contentTypeSchema.types.cjs';

declare const numericInputRegex: RegExp;
declare const VISUAL_BUILDER_FIELD_TYPE_ATTRIBUTE_KEY = "data-cslp-field-type";
declare const VISUAL_BUILDER_CHANNEL_ID = "visual-builder";
declare const LIVE_PREVIEW_OUTLINE_WIDTH_IN_PX = 2;
declare const TOP_EDGE_BUFFER = 42;
declare const RIGHT_EDGE_BUFFER = 180;
declare const TOOLBAR_EDGE_BUFFER = 8;
declare const DATA_CSLP_ATTR_SELECTOR = "data-cslp";
/**
 * The field that can be directly modified using contenteditable=true.
 * This includes all text fields like title and numbers.
 */
declare const ALLOWED_INLINE_EDITABLE_FIELD: FieldDataType[];
declare const ALLOWED_MODAL_EDITABLE_FIELD: FieldDataType[];
declare const ALLOWED_REPLACE_FIELDS: FieldDataType[];
declare const DEFAULT_MULTIPLE_FIELDS: FieldDataType[];
declare const unicodeNonBreakingSpace = "\u00A0";
declare const mentionLimit = 20;
declare const maxMessageLength = 500;

export { ALLOWED_INLINE_EDITABLE_FIELD, ALLOWED_MODAL_EDITABLE_FIELD, ALLOWED_REPLACE_FIELDS, DATA_CSLP_ATTR_SELECTOR, DEFAULT_MULTIPLE_FIELDS, LIVE_PREVIEW_OUTLINE_WIDTH_IN_PX, RIGHT_EDGE_BUFFER, TOOLBAR_EDGE_BUFFER, TOP_EDGE_BUFFER, VISUAL_BUILDER_CHANNEL_ID, VISUAL_BUILDER_FIELD_TYPE_ATTRIBUTE_KEY, maxMessageLength, mentionLimit, numericInputRegex, unicodeNonBreakingSpace };
