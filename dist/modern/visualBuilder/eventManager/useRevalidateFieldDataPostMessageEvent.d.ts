/**
 * Revalidates field data and schema after variant linking operations.
 * Unfocuses the selected element, revalidates data, and then reselects it.
 */
declare function handleRevalidateFieldData(): Promise<void>;

export { handleRevalidateFieldData };
