/**
 * Открывает модальное окно.
 *
 * @param {Element} modalElement - Элемент модального окна.
 * @param {string} modalIsOpenedClass - Класс открытого модального окна.
 * @param {string} [closeKey='Escape'] - Клавиша для закрытия модального окна. По умолчанию "Escape".
 */
function openModal(modalElement, modalIsOpenedClass, closeKey = 'Escape') {
    modalElement.classList.add(modalIsOpenedClass);

    function handleCloseKeyPress(evt) {
        if (evt.key === closeKey) {
            closeModal(modalElement, modalIsOpenedClass);
        }
    }

    modalElement.handleCloseKeyPress = handleCloseKeyPress;
    document.addEventListener('keydown', modalElement.handleCloseKeyPress);
}

/**
 * Закрывает модальное окно.
 *
 * @param {Element} modalElement - Элемент модального окна.
 * @param {string} modalIsOpenedClass - Класс который был добавлен к элементу окна при его открытии.
 */
function closeModal(modalElement, modalIsOpenedClass) {
    modalElement.classList.remove(modalIsOpenedClass);
    document.removeEventListener('keydown', modalElement.handleCloseKeyPress);
}

/**
 * Задаёт данные модального окна с изображением.
 *
 * @param {HTMLElement} modalElement - Элемент модального окна.
 * @param {Object} imageData - Данные изображения.
 * @param {string} imageData.link - Ссылка на изображение.
 * @param {string} imageData.name - Название изображения.
 * @param {Object} modalClasses - Классы используемые в модальном окне.
 * @param {string} modalClasses.image - Класс для элемента изображения внутри.
 * @param {string} modalClasses.caption - Класс для элемента подписи изображения.
 */
function setImageModalData(modalElement, imageData, modalClasses) {
    const image = modalElement.querySelector(`.${modalClasses.image}`);
    const caption = modalElement.querySelector(`.${modalClasses.caption}`);
    image.src = imageData.link;
    image.alt = imageData.name;
    caption.textContent = imageData.name;
}

export {openModal, closeModal, setImageModalData}