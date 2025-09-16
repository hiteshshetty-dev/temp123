import React from 'preact/compat';
import { IActiveThread } from '../../types/collab.types.cjs';

interface ICollabIndicator {
    newThread?: boolean;
    activeThread?: IActiveThread;
}
declare const CollabIndicator: React.FC<ICollabIndicator>;

export { type ICollabIndicator, CollabIndicator as default };
