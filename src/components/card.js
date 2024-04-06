/**
 * Создает карточку на основе шаблона.
 *
 * @param {Object} cardParams Объект с параметрами для создания карточки.
 * @param {Object} cardParams.cardData Данные карточки.
 * @param {string} cardParams.cardData.name Название карточки.
 * @param {string} cardParams.cardData.link Ссылка на изображение карточки.
 * @param {Element} cardParams.cardTemplate Шаблон карточки.
 * @param {Object} cardParams.cardSelectors Селекторы карточки.
 * @param {string} cardParams.cardSelectors.image Селектор изображения карточки.
 * @param {string} cardParams.cardSelectors.title Селектор заголовка карточки.
 * @param {string} cardParams.cardSelectors.deleteButton Селектор кнопки удаления карточки.
 * @param {string} cardParams.cardSelectors.likeButton Селектор кнопки лайка.
 * @param {string} cardParams.cardSelectors.likeButtonIsActive Класс проставленного лайка.
 * @param {Function} [cardParams.onDelete=deleteCard] Функция, вызываемая при удалении карточки.
 * @param {Function} [cardParams.onLike=toggleLikeState] Функция, вызываемая при нажатии на лайк.
 * @return {HTMLElement} Элемент карточки.
 */
function createCard({cardData, cardTemplate, cardSelectors, onDelete = deleteCard, onLike = toggleLikeState}) {
    const cardElement = cardTemplate.cloneNode(true);
    const cardImage = cardElement.querySelector(cardSelectors.image);
    const cardTitle = cardElement.querySelector(cardSelectors.title);
    const deleteButton = cardElement.querySelector(cardSelectors.deleteButton);
    const likeButton = cardElement.querySelector(cardSelectors.likeButton);

    cardImage.src = cardData.link;
    cardImage.alt = cardData.name;
    cardTitle.textContent = cardData.name;

    deleteButton.addEventListener('click', () => onDelete(cardElement));
    likeButton.addEventListener('click', (evt) => toggleLikeState(evt, cardSelectors.likeButtonIsActive));

    return cardElement;
}

/**
 * Удаляет указанную карточку.
 *
 * @param {Element} cardElement - Элемент карточки, который нужно удалить.
 */
function deleteCard(cardElement) {
    cardElement.remove();
}


/**
 * Переключает состояние "лайка".
 *
 * @param {Event} evt - объект события, который был инициирован.
 * @param {string} selectorLikeIsActive Класс проставленного лайка.
 */
function toggleLikeState(evt, selectorLikeIsActive) {
    evt.target.classList.toggle(selectorLikeIsActive);
}

export {createCard, deleteCard};