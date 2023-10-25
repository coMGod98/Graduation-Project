import { IUnityContextEventMap } from "../interfaces/unity-context-event-map";
/**
 * An event system.
 */
export declare class EventSystem {
    /**
     * The event map contains all the events that have been registered to the
     * event system as a key-value pair of event name and event listener.
     * @private
     * @readonly
     */
    private readonly eventMap;
    constructor();
    /**
     * Registers an event to the system.
     * @public
     * @param {string} eventName the event's name
     * @param {Function} eventListener the event's function
     */
    on<MapKey extends keyof IUnityContextEventMap | (string & {})>(eventName: keyof IUnityContextEventMap | (MapKey & {}), eventListener: (...parameters: MapKey extends keyof IUnityContextEventMap ? IUnityContextEventMap[MapKey] : any) => void): void;
    /**
     * Removes all the Event Listeners with a specific Event Name.
     * @public
     * @param {string} eventName the event's name
     * @example unityContext.removeEventListener("progress");
     */
    removeEventListener(eventName: string): void;
    /**
     * Removes all the Event Listeners.
     * @public
     * @example unityContext.removeAllEventListeners();
     */
    removeAllEventListeners(): void;
    /**
     * Dispatches an event that has been registered to the event system.
     * @public
     * @param {string} eventName the event's name
     * @param {any} parameters the event's parameters
     * @example unityContext.dispatchEventListener("gameOver", 180);
     */
    dispatchEvent(eventName: string, ...parameters: any): void;
}
//# sourceMappingURL=event-system.d.ts.map