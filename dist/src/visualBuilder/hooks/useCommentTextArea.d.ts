/** @jsxImportSource preact */
import React from "preact/compat";
import { ICommentState, IMentionList, IMessageDTO, IUserState } from "../types/collab.types";
export declare const useCommentTextArea: (userState: IUserState, comment: IMessageDTO | null | undefined, onClose: (isResolved?: boolean) => void) => {
    state: ICommentState;
    setState: React.SetStateAction<ICommentState>;
    error: import("../types/collab.types").IErrorState;
    showSuggestions: boolean;
    cursorPosition: {
        top: number;
        left: number;
        showAbove: boolean;
    };
    selectedIndex: number;
    filteredUsers: IMentionList[];
    inputRef: React.Ref<HTMLTextAreaElement>;
    listRef: React.Ref<HTMLUListElement>;
    itemRefs: import("preact/hooks").MutableRef<(HTMLLIElement | null)[]>;
    handleInputChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
    handleKeyDown: (e: KeyboardEvent) => void;
    handleSubmit: () => Promise<void>;
    insertMention: (user: IMentionList) => void;
    maxMessageLength: number;
};
//# sourceMappingURL=useCommentTextArea.d.ts.map