import React from 'preact/compat';
import { IActiveThread } from '../types/collab.types.cjs';

/** @jsxImportSource preact */

interface UseCollabPopupProps {
    newThread?: boolean;
    thread?: IActiveThread;
}
declare const useCollabIndicator: ({ newThread, thread, }: UseCollabPopupProps) => {
    buttonRef: React.Ref<HTMLButtonElement>;
    popupRef: React.Ref<HTMLDivElement>;
    showPopup: boolean;
    setShowPopup: React.SetStateAction<boolean>;
    activeThread: IActiveThread;
    setActiveThread: React.SetStateAction<IActiveThread>;
    togglePopup: () => void;
};

export { useCollabIndicator };
