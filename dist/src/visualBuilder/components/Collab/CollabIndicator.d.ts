import React from "preact/compat";
import { IActiveThread } from "../../types/collab.types";
export interface ICollabIndicator {
    newThread?: boolean;
    activeThread?: IActiveThread;
}
declare const CollabIndicator: React.FC<ICollabIndicator>;
export default CollabIndicator;
//# sourceMappingURL=CollabIndicator.d.ts.map