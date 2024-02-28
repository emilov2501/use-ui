import { StoreObserver } from "../../StoreObserver";
import { ModalEvents, ModalId, ModalProps, ModalState } from "../../interfaces";

/**
 * ModalStore is a specialized store observer for managing modal dialog states within an application.
 * It extends `StoreObserver` to handle state related to modal dialogs and implements `ModalEvents` for event handling.
 */
export class ModalStore
  extends StoreObserver<ModalState>
  implements ModalEvents
{
  /**
   * Initializes a new instance of the ModalStore with an optional initial state.
   * If no initial state is provided, a new Map is used as the default state.
   *
   * @param {Map<ModalId, ModalProps>} modals - Initial state of the modals, represented as a Map.
   */
  constructor(public modals = new Map()) {
    super(modals);
  }

  /**
   * Opens a modal dialog with the specified ID and properties.
   * If a modal with the same ID already exists, it updates the modal with the new properties.
   *
   * @param {ModalId} modalId - The unique identifier for the modal dialog to be opened.
   * @param {ModalProps} modalProps - The properties of the modal dialog to be opened.
   */
  public onOpen = (modalId: ModalId, modalProps: ModalProps) => {
    const copy = this.getCopy();
    const updatedState = copy.set(modalId, { modalId, modalProps });

    this.setState(updatedState);
  };

  /**
   * Closes the modal dialog with the specified ID.
   * Throws an error if the modal dialog with the specified ID does not exist.
   *
   * @param {ModalId} modalId - The unique identifier for the modal dialog to be closed.
   * @throws {Error} If the modal ID does not exist in the state.
   */
  public onClose = (modalId: ModalId) => {
    const modals = this.getState();

    if (!modals.has(modalId)) {
      throw new Error(
        "Modal ID is missing. Make sure, you are using this modal inside the Map."
      );
    }
    const copy = this.getCopy();
    const isDeleted = copy.delete(modalId);

    if (isDeleted) {
      this.setState(copy);
    }
  };

  /**
   * Clears all modal dialogs from the state.
   */
  public onClear = () => {
    this.setState(new Map());
  };
}
