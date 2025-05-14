import { IInitData, IClientUrlParams } from '../types/types.cjs';
import '../visualBuilder/types/collab.types.cjs';

declare const handleInitData: (initData: Partial<IInitData>) => void;
declare const handleUserConfig: {
    clientUrlParams: (userConfig: Partial<IClientUrlParams>) => void;
};

export { handleInitData, handleUserConfig };
