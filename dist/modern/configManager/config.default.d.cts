import { IInitData, IConfig } from '../types/types.cjs';
import '../visualBuilder/types/collab.types.cjs';

declare function getUserInitData(): IInitData;
declare function getDefaultConfig(): IConfig;

export { getDefaultConfig, getUserInitData };
