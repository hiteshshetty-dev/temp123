import { ISchemaFieldMap } from '../utils/types/index.types.js';
import '../../cms/types/contentTypeSchema.types.js';

interface AddInstanceButtonProps {
    value: any;
    onClick: (event: MouseEvent) => void;
    label?: string | undefined;
    fieldSchema: ISchemaFieldMap | undefined;
}
declare function AddInstanceButtonComponent(props: AddInstanceButtonProps): JSX.Element;

export { AddInstanceButtonComponent as default };
