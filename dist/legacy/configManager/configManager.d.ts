import { DeepSignal } from 'deepsignal';
import { IConfig, IInitData } from '../types/types.js';
import '../visualBuilder/types/collab.types.js';

declare class Config {
    static config: {
        state: DeepSignal<IConfig>;
    };
    static replace(userInput?: Partial<IInitData>): void;
    static set(key: string, value: any): void;
    static get(): DeepSignal<IConfig>;
    static reset(): void;
}

/**
 * Updates the configuration from the URL parameters.
 * It will receive live_preview containing the hash, content_type_uid and entry_uid.
 */
declare function updateConfigFromUrl(): void;
/**
 * Sets the live preview hash, content_type_uid and entry_uid
 * from the query param to config.
 *
 * @param params query param in an object form, query string.
 *
 * @example
 * ```js
 * setConfigFromParams({
 *      live_preview: "hash",
 *      content_type_uid: "content_type_uid",
 *      entry_uid: "entry_uid",
 * });
 * ```
 *
 * @example
 * ```js
 * setConfigFromParams("?live_preview=hash&content_type_uid=content_type_uid&entry_uid=entry_uid");
 * ```
 * Basically anything that can be passed to `URLSearchParams` constructor.
 */
declare function setConfigFromParams(params?: ConstructorParameters<typeof URLSearchParams>[0]): void;

export { Config as default, setConfigFromParams, updateConfigFromUrl };
