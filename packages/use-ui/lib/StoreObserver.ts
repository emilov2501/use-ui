import clone from "lodash.clone";
import { CommonTypes } from "./interfaces";

type SetStateFunction<State> = (prevState: State) => State;

/**
 * The StoreObserver class provides a simple state management system with subscribe and notify capabilities.
 * It allows components or other parts of an application to subscribe to state changes and get notified when the state updates.
 *
 * @template State - The type of the state managed by this store observer.
 */
export class StoreObserver<State> {
  /**
   * A set of subscriber functions to be called whenever the state changes.
   * @private
   * @type {Set<Noop>}
   */
  private subscribers: Set<CommonTypes.Noop>;

  /**
   * The current state of the store.
   * @private
   * @type {State}
   */
  private state: State;

  /**
   * Initializes a new instance of the StoreObserver class with the given initial state.
   *
   * @param {State} initialState - The initial state of the store.
   */
  constructor(initialState: State) {
    this.subscribers = new Set();
    this.state = initialState;
  }

  /**
   * Subscribes a callback function to the store. The callback will be called whenever the state changes.
   * Returns an unsubscribe function that can be called to unsubscribe the passed callback.
   *
   * @param {Noop} callback - The callback function to be called on state changes.
   * @returns {Function} An unsubscribe function that removes the callback from the subscribers.
   */
  public subscribe = (callback: CommonTypes.Noop) => {
    this.subscribers.add(callback);
    return () => {
      this.subscribers.delete(callback);
    };
  };

  /**
   * Notifies all subscribed callbacks of a state change by calling each one.
   * @private
   */
  private notify(): void {
    this.subscribers.forEach((callback) => callback());
  }

  /**
   * Updates the state of the store. This method allows for both direct state updates
   * and functional updates. If a function is provided, it will receive the current state
   * and must return the updated state. After the state is updated, all observers are notified.
   *
   * @param {State | SetStateFunction<State>} updated - The new state or a function that
   * produces the new state based on the current state.
   */
  public setState = (updated: State | SetStateFunction<State>): void => {
    // Check if 'updated' is a function. If so, it expects the current state as an argument
    // and returns the new state. Otherwise, 'updated' is directly assigned as the new state.
    if (typeof updated === "function") {
      const updateFn = updated as SetStateFunction<State>;
      this.state = updateFn(this.state);
    } else {
      this.state = updated;
    }

    // After updating the state, notify all observers about the state change.
    this.notify();
  };

  /**
   * Returns the current state of the store.
   *
   * @returns {State} The current state.
   */
  public getState = (): State => this.state;

  /**
   * Returns a deep copy of the current state. Useful for preventing accidental mutations to the state.
   *
   * @returns {State} A deep copy of the current state.
   */
  public getCopy = (): State => clone(this.state);
}
