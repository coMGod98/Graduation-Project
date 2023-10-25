import { IUnityInstanceParameters } from "../interfaces/unity-instance-parameters";
import { Status as UnityLoaderStatus } from "./use-unity-loader";
/**
 * Creates a Unity Instance.
 * @param unityLoaderStatus The loader status
 * @param htmlCanvasElement A reference to the html canvas element
 * @param unityInstanceParameters The Unity instance parameters
 * @returns the Unity Instance among with the status of the Unity Instance.
 */
export declare function useUnityInstance(unityLoaderStatus: UnityLoaderStatus, htmlCanvasElement: HTMLCanvasElement | null, unityInstanceParameters: IUnityInstanceParameters): {
    unityInstance: UnityInstance | null;
    progression: number;
    error: string | null;
};
//# sourceMappingURL=use-unity-instance.d.ts.map