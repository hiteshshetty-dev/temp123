type EntryIdentifiers = {
    entriesInCurrentPage: {
        entryUid: string;
        contentTypeUid: string;
        locale: string;
    }[];
};
declare function getEntryIdentifiersInCurrentPage(): EntryIdentifiers;

export { getEntryIdentifiersInCurrentPage };
