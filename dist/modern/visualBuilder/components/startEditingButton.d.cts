import { IConfigEditButtonBuilder } from '../../types/types.cjs';
import '../types/collab.types.cjs';

type Position = NonNullable<IConfigEditButtonBuilder['position']>;
declare function getEditButtonPosition(position: any): Position;
declare function StartEditingButtonComponent(): JSX.Element | null;

export { StartEditingButtonComponent as default, getEditButtonPosition };
