/**
 * Константы для определения позиции вставки карты.
 * @type {Object}
 * @property {string} END - Карта должна быть вставлен в конец контейнера.
 * @property {string} START - Карта должна быть вставлен в начало контейнера.
 */
const INSERT_POSITION = {
    END: 'end',
    START: 'start'
};

/**
 * Создает карточку на основе шаблона.
 *
 * @param {Object} cardParams Объект с параметрами для создания карточки.
 * @param {Object} cardParams.cardData Данные карточки.
 * @param {string} cardParams.cardData.name Название карточки.
 * @param {string} cardParams.cardData.link Ссылка на изображение карточки.
 * @param {Element} cardParams.cardTemplate Шаблон карточки.
 * @param {Object} cardParams.cardClasses Классы карточки.
 * @param {string} cardParams.cardClasses.image Класс изображения карточки.
 * @param {string} cardParams.cardClasses.title Класс заголовка карточки.
 * @param {string} cardParams.cardClasses.deleteButton Класс кнопки удаления карточки.
 * @param {string} cardParams.cardClasses.likeButton Класс кнопки лайка.
 * @param {string} cardParams.cardClasses.likeButtonIsActive Класс проставленного лайка.
 * @param {Function} cardParams.onClick Функция, вызываемая при нажатии на карточку.
 * @param {Function} [cardParams.onDelete=deleteCard] Функция, вызываемая при удалении карточки. По умолчанию "deleteCard".
 * @param {Function} [cardParams.onLike=toggleLikeState] Функция, вызываемая при нажатии на лайк. По умолчанию "toggleLikeState".
 * @return {HTMLElement} Элемент карточки.
 */
function createCard({cardData, cardTemplate, cardClasses, onClick, onDelete = deleteCard, onLike = toggleLikeState}) {
    const cardElement = cardTemplate.cloneNode(true);
    const cardImage = cardElement.querySelector(`.${cardClasses.image}`);
    const cardTitle = cardElement.querySelector(`.${cardClasses.title}`);
    const deleteButton = cardElement.querySelector(`.${cardClasses.deleteButton}`);
    const likeButton = cardElement.querySelector(`.${cardClasses.likeButton}`);

    cardImage.src = cardData.link;
    cardImage.alt = cardData.name;
    cardTitle.textContent = cardData.name;

    cardImage.addEventListener('click', () => {
        onClick(cardData)
    });
    deleteButton.addEventListener('click', () => onDelete(cardElement));
    likeButton.addEventListener('click', (evt) => toggleLikeState(evt, cardClasses.likeButtonIsActive));

    return cardElement;
}

/**
 * Вставляет карточку в указанный элемент.
 *
 * @param {Element} targetElement - Элемент DOM, в который будет вставлена карточка.
 * @param {Element} cardElement - Элемент карточки, который необходимо вставить.
 * @param {string} [insertPosition='end'] - Позиция вставки карточки.
 *                                          Допустимые значения: 'start', 'end'.
 *                                          По умолчанию 'end'.
 */
function insertCard(targetElement, cardElement, insertPosition = 'end') {
    if (insertPosition === 'start') {
        targetElement.prepend(cardElement);
    } else {
        targetElement.append(cardElement);
    }
}

/**
 * Удаляет указанную карточку.
 *
 * @param {Element} cardElement - Элемент карточки, который необходимо удалить.
 */
function deleteCard(cardElement) {
    cardElement.remove();
}

/**
 * Переключает состояние "лайка".
 *
 * @param {Event} evt - объект события, который был инициирован.
 * @param {string} likeIsActiveClass Класс проставленного лайка.
 */
function toggleLikeState(evt, likeIsActiveClass) {
    evt.target.classList.toggle(likeIsActiveClass);
}

export {INSERT_POSITION, createCard, insertCard, deleteCard};