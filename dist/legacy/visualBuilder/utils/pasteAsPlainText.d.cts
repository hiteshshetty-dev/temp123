import * as lodash from 'lodash';

declare const pasteAsPlainText: lodash.DebouncedFuncLeading<(e: Event) => void>;

export { pasteAsPlainText };
