import { EntryPermissions } from './getEntryPermissions.js';

declare const getEntryPermissionsCached: {
    (args_0: {
        entryUid: string;
        contentTypeUid: string;
        locale: string;
    }): Promise<EntryPermissions>;
    clearCache: () => void;
};

export { getEntryPermissionsCached };
