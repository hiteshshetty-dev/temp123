import { IConfigEditButtonBuilder } from '../../types/types.js';
import '../types/collab.types.js';

type Position = NonNullable<IConfigEditButtonBuilder['position']>;
declare function getEditButtonPosition(position: any): Position;
declare function StartEditingButtonComponent(): JSX.Element | null;

export { StartEditingButtonComponent as default, getEditButtonPosition };
