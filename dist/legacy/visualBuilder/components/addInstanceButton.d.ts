import { ISchemaFieldMap } from '../utils/types/index.types.js';
import { CslpData } from '../../cslp/types/cslp.types.js';
import { Signal } from '@preact/signals';
import '../../cms/types/contentTypeSchema.types.js';

interface AddInstanceButtonProps {
    value: any;
    onClick: (event: MouseEvent) => void;
    label?: string | undefined;
    fieldSchema: ISchemaFieldMap | undefined;
    fieldMetadata: CslpData;
    index: number;
    loading: Signal<boolean>;
}
declare function AddInstanceButtonComponent(props: AddInstanceButtonProps): JSX.Element;

export { AddInstanceButtonComponent as default };
