export declare enum Status {
    Idle = "Idle",
    Loading = "Loading",
    Loaded = "Loaded",
    Error = "Error"
}
/**
 * Hook to embed a Unity Loader script.
 * @param src The source of the unity loader
 * @returns a hook that returns the status of the loader
 */
export declare function useUnityLoader(src: string): Status;
//# sourceMappingURL=use-unity-loader.d.ts.map