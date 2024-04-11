import {MODAL_CLASS, MODAL_CLOSE_KEY} from "./modalConstants";

/**
 * Обрабатывает нажатие клавиши для закрытия модального окна.
 *
 * @param {KeyboardEvent} evt - Событие нажатия клавиши.
 * @param {Element} modalElement - Элемент модального окна, которое будет закрыто при нажатии клавиши.
 */
function handleCloseKeyPress(evt, modalElement) {
    if (evt.key === MODAL_CLOSE_KEY) {
        closeModal(modalElement);
    }
}

/**
 * Открывает модальное окно.
 *
 * @param {Element} modalElement - Элемент модального окна.
 */
function openModal(modalElement) {
    modalElement.classList.add(MODAL_CLASS.IS_OPENED);

    modalElement.handleCloseKeyPress = handleCloseKeyPress;
    document.addEventListener('keydown', (evt, modalElement) => {
        handleCloseKeyPress(evt, modalElement);
    });
}

/**
 * Закрывает модальное окно.
 *
 * @param {Element} modalElement - Элемент модального окна.
 */
function closeModal(modalElement) {
    modalElement.classList.remove(MODAL_CLASS.IS_OPENED);
    document.removeEventListener('keydown', handleCloseKeyPress);
}

export {openModal, closeModal}