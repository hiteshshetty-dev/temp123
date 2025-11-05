import React from 'preact/compat';
import { IActiveThread } from '../types/collab.types.cjs';

/** @jsxImportSource preact */

interface UseCollabPopupProps {
    newThread?: boolean;
    thread?: IActiveThread;
}
declare const useCollabIndicator: ({ newThread, thread, }: UseCollabPopupProps) => {
    buttonRef: React.RefObject<HTMLButtonElement>;
    popupRef: React.RefObject<HTMLDivElement>;
    showPopup: boolean;
    setShowPopup: React.Dispatch<React.SetStateAction<boolean>>;
    activeThread: IActiveThread;
    setActiveThread: React.Dispatch<React.SetStateAction<IActiveThread>>;
    togglePopup: () => void;
};

export { useCollabIndicator };
