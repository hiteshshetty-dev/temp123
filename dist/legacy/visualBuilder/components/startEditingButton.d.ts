import { IConfigEditInVisualBuilderButton } from '../../types/types.js';
import '../types/collab.types.js';

type Position = NonNullable<IConfigEditInVisualBuilderButton['position']>;
declare function getEditButtonPosition(position: any): Position;
declare function StartEditingButtonComponent(): JSX.Element | null;

export { StartEditingButtonComponent as default, getEditButtonPosition };
