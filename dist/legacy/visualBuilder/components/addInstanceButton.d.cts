import { ISchemaFieldMap } from '../utils/types/index.types.cjs';
import '../../cms/types/contentTypeSchema.types.cjs';

interface AddInstanceButtonProps {
    value: any;
    onClick: (event: MouseEvent) => void;
    label?: string | undefined;
    fieldSchema: ISchemaFieldMap | undefined;
}
declare function AddInstanceButtonComponent(props: AddInstanceButtonProps): JSX.Element;

export { AddInstanceButtonComponent as default };
