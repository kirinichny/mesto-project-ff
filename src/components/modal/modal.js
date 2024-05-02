import {MODAL_CLASS, MODAL_CLOSE_KEY} from "./modalConstants";

/**
 * Обрабатывает нажатие клавиши для закрытия модального окна.
 *
 * @param {KeyboardEvent} evt - Событие нажатия клавиши.
 */
function handleCloseKeyPress(evt) {
    if (evt.key === MODAL_CLOSE_KEY) {
        const modalElement = document.querySelector(`.${MODAL_CLASS.IS_OPENED}`)
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
    document.addEventListener('keydown', handleCloseKeyPress);
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