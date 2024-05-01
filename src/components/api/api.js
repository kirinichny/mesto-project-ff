import {apiConfig} from "./apiConfig";

/**
 * Выполняет запрос к API и возвращает ответ.
 *
 * @param {Object} request Объект с параметрами для запроса.
 * @param {string} request.endpoint Эндпоинт запроса.
 * @param {string} request.method HTTP-метод запроса.
 * @param {Object} [request.body] Тело запроса в формате JSON (необязательно).
 * @return {Promise<Object>} Промис с результатом запроса в формате JSON или текстом ошибки.
 */
function fetchApiResponse(request) {
    return fetch(`${apiConfig.baseUrl}/${request.endpoint}`, {
        headers: apiConfig.headers,
        method: request.method,
        body: JSON.stringify(request.body)
    }).then(
        res => {
            return (res.ok) ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
        }
    );
}

/**
 * Получает данные текущего пользователя.
 *
 * @return {Promise<Object>} Промис с данными пользователя.
 */
function getCurrentUser() {
    return fetchApiResponse({
        method: 'GET',
        endpoint: 'users/me'
    });
}

/**
 * Получает все карточки.
 *
 * @return {Promise<Object[]>} Промис с массивом карточек.
 */
function getCards() {
    return fetchApiResponse({
        method: 'GET',
        endpoint: 'cards'
    });
}

/**
 * Добавляет карточку.
 *
 * @param {Object} cardData Данные для создания карточки.
 * @param {string} cardData.name Название карточки.
 * @param {string} cardData.link Ссылка на изображение карточки.
 * @return {Promise<Object>} Промис с данными новой карточки.
 */
function addCard(cardData) {
    return fetchApiResponse({
        method: 'POST',
        endpoint: 'cards',
        body: {
            name: cardData.name,
            link: cardData.link
        }
    });
}

/**
 * Добавляет лайк карточке.
 *
 * @param {string} cardId Идентификатор карточки.
 * @return {Promise<Object>} Промис с данными карточки после добавления лайка.
 */
function addLike(cardId) {
    return fetchApiResponse({
        method: 'PUT',
        endpoint: `cards/likes/${cardId}`
    });
}

/**
 * Обновляет данные текущего пользователя.
 *
 * @param {Object} userData Объект с данными пользователя.
 * @param {string} userData.name Новое имя пользователя.
 * @param {string} userData.about Новое описание пользователя.
 * @return {Promise<Object>} Промис с обновленными данными пользователя.
 */
function updateCurrentUser(userData) {
    return fetchApiResponse({
        method: 'PATCH',
        endpoint: 'users/me',
        body: {
            name: userData.name,
            about: userData.about
        }
    });
}

/**
 * Обновляет аватар текущего пользователя.
 *
 * @param {string} avatarLink Ссылка на новый аватар.
 * @return {Promise<Object>} Промис с обновленными данными пользователя.
 */
function updateAvatar(avatarLink) {
    return fetchApiResponse({
        method: 'PATCH',
        endpoint: 'users/me/avatar',
        body: {avatar: avatarLink}
    });
}

/**
 * Удаляет карточку.
 *
 * @param {string} cardId Идентификатор карточки.
 * @return {Promise<void>} Промис без данных.
 */
function deleteCard(cardId) {
    return fetchApiResponse({
        method: 'DELETE',
        endpoint: `cards/${cardId}`
    });
}

/**
 * Удаляет лайка с карточки.
 *
 * @param {string} cardId Идентификатор карточки.
 * @return {Promise<Object>} Промис с данными карточки после удаления лайка.
 */
function deleteLike(cardId) {
    return fetchApiResponse({
        method: 'DELETE',
        endpoint: `cards/likes/${cardId}`
    });
}

export {getCurrentUser, getCards, addCard, addLike, updateCurrentUser, updateAvatar, deleteCard, deleteLike};