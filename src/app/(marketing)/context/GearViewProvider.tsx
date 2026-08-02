"use client";

import {
    createContext,
    useContext,
    useMemo,
    useState,
    ReactNode,
} from "react";

type ViewMode = "grid" | "list";

interface GearViewContextType {
    viewMode: ViewMode;
    setViewMode: (mode: ViewMode) => void;
}

const GearViewContext = createContext<GearViewContextType | null>(null);

export const GearViewProvider = ({
    children,
}: {
    children: ReactNode;
}) => {
    const [viewMode, setViewMode] = useState<ViewMode>("grid");

    const value = useMemo(
        () => ({
            viewMode,
            setViewMode,
        }),
        [viewMode]
    );

    return (
        <GearViewContext.Provider value= { value } >
        { children }
        </GearViewContext.Provider>
  );
};

export const useGearView = () => {
    const context = useContext(GearViewContext);

    if (!context) {
        throw new Error(
            "useGearView must be used inside GearViewProvider"
        );
    }

    return context;
};