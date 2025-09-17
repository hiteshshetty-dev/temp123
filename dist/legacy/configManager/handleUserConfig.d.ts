import { IInitData, IClientUrlParams } from '../types/types.js';
import '../visualBuilder/types/collab.types.js';

declare const handleInitData: (initData: Partial<IInitData>) => void;
declare const handleUserConfig: {
    clientUrlParams: (userConfig: Partial<IClientUrlParams>) => void;
};

export { handleInitData, handleUserConfig };
