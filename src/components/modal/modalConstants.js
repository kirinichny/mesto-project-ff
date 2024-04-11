/**
 * @file Описывает константы для модальных окон.
 */

/**
 * Классы модального окна.
 * @type {Object}
 * @property {string} IS_OPENED - Класс для открытого состояния модального окна.
 * @property {string} CLOSE_BUTTON - Класс кнопки для закрытия модального окна.
 */
const MODAL_CLASS = {
    IS_OPENED: "popup_is-opened",
    CLOSE_BUTTON: "popup__close"
}

/**
 * Клавиша, используемая для закрытия модального окна.
 * @constant
 * @type {string}
 */
const MODAL_CLOSE_KEY = 'Escape';

export {MODAL_CLASS, MODAL_CLOSE_KEY};