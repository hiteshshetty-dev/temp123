import { IConfigEditInVisualBuilderButton } from '../../types/types.cjs';
import '../types/collab.types.cjs';

type Position = NonNullable<IConfigEditInVisualBuilderButton['position']>;
declare function getEditButtonPosition(position: any): Position;
declare function StartEditingButtonComponent(): JSX.Element | null;

export { StartEditingButtonComponent as default, getEditButtonPosition };
