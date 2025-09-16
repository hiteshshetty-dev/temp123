export interface EntryPermissions {
    create: boolean;
    read: boolean;
    update: boolean;
    delete: boolean;
    publish: boolean;
}
export declare function getEntryPermissions({ entryUid, contentTypeUid, locale, }: {
    entryUid: string;
    contentTypeUid: string;
    locale: string;
}): Promise<EntryPermissions>;
//# sourceMappingURL=getEntryPermissions.d.ts.map