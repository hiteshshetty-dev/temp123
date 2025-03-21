import * as preact_hooks from 'preact/hooks';
import { IUserState, IMessageDTO, ICommentState, IErrorState, IMentionList } from '../types/collab.types.cjs';
import React from 'preact/compat';

declare const useCommentTextArea: (userState: IUserState, comment: IMessageDTO | null | undefined, onClose: (isResolved?: boolean) => void) => {
    state: ICommentState;
    setState: React.SetStateAction<ICommentState>;
    error: IErrorState;
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
    itemRefs: preact_hooks.MutableRef<(HTMLLIElement | null)[]>;
    handleInputChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
    handleKeyDown: (e: KeyboardEvent) => void;
    handleSubmit: () => Promise<void>;
    insertMention: (user: IMentionList) => void;
    maxMessageLength: number;
};

export { useCommentTextArea };
