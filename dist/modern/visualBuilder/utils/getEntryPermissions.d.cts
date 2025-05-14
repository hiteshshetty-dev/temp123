interface EntryPermissions {
    create: boolean;
    read: boolean;
    update: boolean;
    delete: boolean;
    publish: boolean;
}
declare function getEntryPermissions({ entryUid, contentTypeUid, locale, }: {
    entryUid: string;
    contentTypeUid: string;
    locale: string;
}): Promise<EntryPermissions>;

export { type EntryPermissions, getEntryPermissions };
