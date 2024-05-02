/**
 * Константы для определения позиции вставки элемента в DOM.
 * @type {Object}
 * @property {string} START - Элемент должен быть вставлен в начало контейнера.
 * @property {string} END - Элемент должен быть вставлен в конец контейнера.
 */
const ELEMENT_INSERT_POSITION = {
    START: 'start',
    END: 'end'
};

/**
 * Константы для строк текста, которые используются в интерфейсе пользователя.
 * @type {Object}
 * @property {string} SAVE_IN_PROGRESS - Текст, отображаемый во время процесса сохранения.
 * @property {string} DELETE_IN_PROGRESS - Текст, отображаемый во время процесса удаления.
 */
const UI_TEXTS = {
    SAVE_IN_PROGRESS: 'Сохранение...',
    DELETE_IN_PROGRESS: 'Удаление...'
};

export {ELEMENT_INSERT_POSITION, UI_TEXTS};