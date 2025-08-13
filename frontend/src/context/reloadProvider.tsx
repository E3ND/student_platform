import { createContext, useState } from "react";
import type { ReactNode, Dispatch, SetStateAction } from "react";

interface ReloadContextType {
    reload: boolean;
    setReload: Dispatch<SetStateAction<boolean>>;
}

export const ReloadContext = createContext<ReloadContextType | null>(null);

interface ReloadProviderProps {
    children: ReactNode;
}

export function ReloadProvider({ children }: ReloadProviderProps) {
    const [reload, setReload] = useState(false);

    return (
        <ReloadContext.Provider value={{ reload, setReload }}>
            {children}
        </ReloadContext.Provider>
    );
}
