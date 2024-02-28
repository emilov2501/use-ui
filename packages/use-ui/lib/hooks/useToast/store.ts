import { StoreObserver } from "../../StoreObserver";
import { ToastProps, ToastState } from "../../interfaces";

let toastTimeoutId: null | ReturnType<typeof setTimeout>;

/**
 * ToastStore is a store observer for managing toast notifications.
 * It extends a generic StoreObserver to handle toast state, including visibility and timeout settings.
 *
 * @extends StoreObserver<ToastState>
 */
export class ToastStore extends StoreObserver<ToastState> {
  /**
   * Initializes a new instance of the ToastStore with an initial state.
   *
   * @param {ToastState} initialState - The initial state of the toast notifications.
   */
  constructor(initialState: ToastState) {
    super(initialState);
  }

  /**
   * Private method to show the toast notification by updating the state's show property to true.
   */
  private onShow = (): void => {
    this.setState((prev) => ({
      ...prev,
      show: true,
    }));
  };

  /**
   * Private method to hide the toast notification by updating the state's show property to false.
   */
  private onHide = (): void => {
    this.setState((prev) => ({
      ...prev,
      show: false,
    }));
  };

  /**
   * Updates the timeout duration for the toast notification.
   *
   * @param {number} timeout - The timeout duration in milliseconds.
   */
  public onUpdateTimeOut = (timeout: number): void => {
    this.setState((prev) => ({
      ...prev,
      timeout,
    }));
  };

  /**
   * Private method to show the toast notification by updating the state's props property.
   *
   * @param {props} ToastProps - The properties of the toast notification to display.
   */
  private onUpdateProps = (props: ToastProps): void => {
    this.setState((prev) => ({
      ...prev,
      props,
    }));
  };

  /**
   * Displays a toast notification with the specified properties.
   * If a toast is already being shown with a timeout, it clears the current timeout before setting a new one.
   *
   * @param {ToastProps} props - The properties of the toast notification to display.
   */
  public toast = (props: ToastProps): void => {
    const state = this.getState();
    if (toastTimeoutId !== null && state.timeout) {
      clearTimeout(toastTimeoutId);
    }

    this.onUpdateProps(props);
    this.onShow();

    if (state.timeout) {
      toastTimeoutId = setTimeout(() => {
        this.onHide();
        toastTimeoutId = null;
      }, state.timeout);
    }
  };
}
