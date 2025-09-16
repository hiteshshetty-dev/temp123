/** @jsxImportSource preact */
import React from "preact/compat";
import { IActiveThread } from "../types/collab.types";
interface UseCollabPopupProps {
    newThread?: boolean;
    thread?: IActiveThread;
}
export declare const useCollabIndicator: ({ newThread, thread, }: UseCollabPopupProps) => {
    buttonRef: React.Ref<HTMLButtonElement>;
    popupRef: React.Ref<HTMLDivElement>;
    showPopup: boolean;
    setShowPopup: React.SetStateAction<boolean>;
    activeThread: IActiveThread;
    setActiveThread: React.SetStateAction<IActiveThread>;
    togglePopup: () => void;
};
export {};
//# sourceMappingURL=useCollabIndicator.d.ts.map