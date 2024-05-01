/**
 * Создает карточку на основе шаблона.
 *
 * @param {Object} cardParams Объект с параметрами для создания карточки.
 * @param {Object} cardParams.cardData Данные карточки.
 * @param {string} cardParams.cardData._id Идентификатор карточки.
 * @param {string} cardParams.cardData.name Название карточки.
 * @param {string} cardParams.cardData.link Ссылка на изображение карточки.
 * @param {string} cardParams.cardData.owner._id Идентификатор пользователя создавшего карточку.
 * @param {Element} cardParams.cardTemplate Шаблон карточки.
 * @param {Object} cardParams.cardClasses Классы карточки.
 * @param {string} cardParams.cardClasses.image Класс изображения карточки.
 * @param {string} cardParams.cardClasses.title Класс заголовка карточки.
 * @param {string} cardParams.cardClasses.deleteButton Класс кнопки удаления карточки.
 * @param {string} cardParams.cardClasses.likeButton Класс кнопки лайка.
 * @param {string} cardParams.cardClasses.likeButtonIsActive Класс проставленного лайка.
 * @param {string} cardParams.cardClasses.likeCounter Класс счетчика лайков.
 * @param {string} cardParams.currentUserId Идентификатор текущего пользователя для определения прав на изменение карточки.
 * @param {Function} cardParams.onClick Функция, вызываемая при нажатии на карточку.
 * @param {Function} cardParams.onAddLike Функция, вызываемая при добавлении лайка.
 * @param {Function} cardParams.onDeleteLike Функция, вызываемая при удалении лайка.
 * @param {Function} cardParams.onDelete Функция, вызываемая при удалении карточки.
 * @return {HTMLElement} Возвращает элемент карточки.
 */
function createCard({
                        cardData,
                        cardTemplate,
                        cardClasses,
                        currentUserId,
                        onClick,
                        onAddLike,
                        onDeleteLike,
                        onDelete
                    }) {
    const cardElement = cardTemplate.cloneNode(true);
    const cardImageElement = cardElement.querySelector(`.${cardClasses.image}`);
    const cardTitleElement = cardElement.querySelector(`.${cardClasses.title}`);
    const deleteButtonElement = cardElement.querySelector(`.${cardClasses.deleteButton}`);
    const likeButtonElement = cardElement.querySelector(`.${cardClasses.likeButton}`);
    const likeCounterElement = cardElement.querySelector(`.${cardClasses.likeCounter}`);
    const isCurrentUserOwner = cardData.owner._id === currentUserId;
    const isLikedByCurrentUser = cardData.likes.some(likeData => likeData._id === currentUserId);

    cardImageElement.src = cardData.link;
    cardImageElement.alt = cardData.name;
    cardTitleElement.textContent = cardData.name;
    likeCounterElement.textContent = cardData.likes.length;

    if (isLikedByCurrentUser) {
        likeButtonElement.classList.add(cardClasses.likeButtonIsActive);
    }

    if (isCurrentUserOwner) {
        deleteButtonElement.addEventListener('click', () => onDelete(cardData._id, cardElement));
    } else {
        deleteButtonElement.remove();
    }

    cardImageElement.addEventListener('click', () => {
        onClick(cardData)
    });

    likeButtonElement.addEventListener('click', (evt) => toggleLikeState({
        evt,
        cardId: cardData._id,
        likeCounterElement,
        likeIsActiveClass: cardClasses.likeButtonIsActive,
        onAddLike,
        onDeleteLike
    }));

    return cardElement;
}

/**
 * Переключает состояние лайка на элементе карточки.
 *
 * @param {Object} params - Объект с параметрами функции.
 * @param {Event} params.evt - Событие, вызвавшее функцию.
 * @param {string} params.cardId - Идентификатор карточки.
 * @param {HTMLElement} params.likeCounterElement - Элемент для отображения количества лайков.
 * @param {string} params.likeIsActiveClass - Класс проставленного лайка.
 * @param {function} params.onAddLike - Функция для добавления лайка, возвращает Promise.
 * @param {function} params.onDeleteLike - Функция для удаления лайка, возвращает Promise.
 */
function toggleLikeState({evt, cardId, likeCounterElement, likeIsActiveClass, onAddLike, onDeleteLike}) {
    const likeButtonElement = evt.target;
    const isLiked = likeButtonElement.classList.contains(likeIsActiveClass);
    const likeAction = isLiked ? onDeleteLike(cardId) : onAddLike(cardId);

    likeAction.then(res => {
        if (isLiked) {
            likeButtonElement.classList.remove(likeIsActiveClass);
        } else {
            likeButtonElement.classList.add(likeIsActiveClass);
        }
        likeCounterElement.textContent = res.likes.length;
    }).catch(err => console.log(err));
}

export {createCard};