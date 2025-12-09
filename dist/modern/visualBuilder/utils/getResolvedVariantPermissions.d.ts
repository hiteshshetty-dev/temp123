import { CslpData } from '../../cslp/types/cslp.types.js';

type FieldContext = Pick<CslpData, "content_type_uid" | "entry_uid" | "locale" | "variant" | "fieldPathWithIndex">;
interface ResolvedVariantPermissions {
    update: boolean;
    error?: boolean;
}
declare function getResolvedVariantPermissions(fieldContext: FieldContext): Promise<ResolvedVariantPermissions>;

export { type FieldContext, type ResolvedVariantPermissions, getResolvedVariantPermissions };
