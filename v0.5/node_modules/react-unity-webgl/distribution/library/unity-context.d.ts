import { IUnityConfig } from "../interfaces/unity-config";
import { EventSystem } from "./event-system";
/**
 * A Unity Context object can be fed to a Unity component instance to configure
 * the Unity Instance and handle the communication between the two.
 */
export declare class UnityContext extends EventSystem {
    unityConfig: IUnityConfig;
    unityInstance: UnityInstance | null;
    htmlCanvasElement: HTMLCanvasElement | null;
    /**
     * Creates a new Unity Context instance which can be fed to a Unity component
     * in order to render a Unity Instance.
     * @param unityConfig The Unity Config
     */
    constructor(unityConfig: IUnityConfig);
    /**
     * Sends a message to the UnityInstance to invoke a public method.
     * @public
     * @param {string} gameObjectName the name of the game object in your Unity scene.
     * @param {string} methodName the name of the public method on the game object.
     * @param {string | number | boolean} parameter an optional method parameter.
     */
    send(gameObjectName: string, methodName: string, parameter?: string | number | boolean): void;
    /**
     * Asynchronously ask for the pointer to be locked on current canvas. To track
     * the success or failure of the request, it is necessary to listen for the
     * pointerlockchange and pointerlockerror events at the Document level.
     * @public
     * @see https://developer.mozilla.org/en-US/docs/Web/API/Element/requestPointerLock
     */
    requestPointerLock(): void;
    /**
     * Takes a screenshot of the canvas and returns a data URL containing image
     * data. The image data is in .png format unless otherwise specified.
     * @public
     * @param dataType The image format of the screenshot
     * @param quality The quality of the jpg or webp screenshot
     * @returns a data URL containing image data of a snapshot of the canvas
     */
    takeScreenshot(dataType?: "image/png" | "image/jpeg" | "image/webp", quality?: number): string | null;
    /**
     * Enables or disabled the Fullscreen mode of the Unity Instance.
     * @public
     * @param {boolean} enabled
     */
    setFullscreen(enabled: boolean): void;
    /**
     * Quits the Unity Instance and clears it from memory.
     * @public
     * @async
     * @returns A promise that resolves when the Unity Instance is quit.
     */
    quitUnityInstance(): Promise<void>;
}
//# sourceMappingURL=unity-context.d.ts.map