/*
 * Объект конфигурации API.
 *
 * @type {Object}
 * @property {string} baseUrl URL-адрес API.
 * @property {Object} headers Заголовки, которые будут включены в запросы.
 * @property {string} headers.authorization Токен авторизации для доступа к API.
 * @property {string} headers['Content-Type'] Тип контента.
 */
const apiConfig = {
    baseUrl: 'https://nomoreparties.co/v1/wff-cohort-12',
    headers: {
        authorization: '98e03516-e97b-49fe-bfd1-0cb42464d9af',
        'Content-Type': 'application/json'
    }
}

export {apiConfig};