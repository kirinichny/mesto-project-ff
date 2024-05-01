/**
 * Проверяет, содержит ли список элементов хотя бы один невалидный элемент.
 *
 * @param {HTMLInputElement[]} inputList - Массив HTML элементов для проверки.
 * @return {boolean} Возвращает true, если хотя бы один элемент невалиден, иначе false.
 */
function hasInvalidInput(inputList) {
    return inputList.some(inputElement => !inputElement.validity.valid);
}

/**
 * Отображает сообщение об ошибке для неправильно заполненного элемента формы.
 *
 * @param {Object} params - Объект с параметрами функции.
 * @param {HTMLElement} params.formElement - Форма.
 * @param {HTMLInputElement} params.inputElement - Элемент формы, для которого нужно отобразить ошибку.
 * @param {Object} params.errorClasses - Классы стилей для ошибок.
 */
function showInputError({formElement, inputElement, errorClasses}) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

    inputElement.classList.add(errorClasses.inputErrorClass);
    errorElement.classList.add(errorClasses.errorClass);

    errorElement.textContent = inputElement.validationMessage;
}

/**
 * Скрывает сообщение об ошибке для элемента формы.
 *
 * @param {Object} params - Объект с параметрами функции.
 * @param {HTMLElement} params.formElement - Формы.
 * @param {HTMLElement} params.inputElement - Элемент формы, для которого нужно скрыть ошибку.
 * @param {Object} params.errorClasses - Классы стилей для ошибок.
 */
function hideInputError({formElement, inputElement, errorClasses}) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

    inputElement.classList.remove(errorClasses.inputErrorClass);
    errorElement.classList.remove(errorClasses.errorClass);

    errorElement.textContent = '';
}

/**
 * Переключает отображение ошибки в зависимости от валидности данных.
 *
 * @param {Object} params - Объект с параметрами функции.
 * @param {HTMLElement} params.formElement - Форма.
 * @param {HTMLInputElement} params.inputElement - Элемент формы, для которого нужно проверить и отобразить/скрыть ошибку.
 * @param {Object} params.errorClasses - Классы стилей для ошибок.
 */
function toggleInputError({formElement, inputElement, errorClasses}) {
    if (inputElement.validity.patternMismatch) {
        inputElement.setCustomValidity(inputElement.dataset.errorMessage);
    } else {
        inputElement.setCustomValidity('');
    }

    if (!inputElement.validity.valid) {
        showInputError({formElement, inputElement, errorClasses});
    } else {
        hideInputError({formElement, inputElement, errorClasses});
    }
}

/**
 * Включает/выключает кнопку отправки формы в зависимости от валидности всех полей ввода формы.
 *
 * @param {Object} params - Объект с параметрами функции.
 * @param {HTMLInputElement[]} params.inputList - Список всех элементов формы.
 * @param {Element} params.buttonElement - Кнопка отправки формы.
 * @param {string} params.inactiveButtonClass - Класс стиля для неактивной кнопки.
 */
function toggleButtonState({inputList, buttonElement, inactiveButtonClass}) {
    if (hasInvalidInput(inputList)) {
        buttonElement.classList.add(inactiveButtonClass);
    } else {
        buttonElement.classList.remove(inactiveButtonClass);
    }
}

/**
 * Устанавливает обработчики событий для элементов формы.
 *
 * @param {Object} params - Объект с параметрами функции.
 * @param {HTMLElement} params.formElement - Форма.
 * @param {Object} params.validationParams - Параметры валидации, селекторы и классы стилей.
 */
function setEventListeners({formElement, validationParams}) {
    const inputList = Array.from(formElement.querySelectorAll(validationParams.inputSelector));
    const buttonElement = formElement.querySelector(validationParams.submitButtonSelector);
    const inactiveButtonClass = validationParams.inactiveButtonClass;
    const errorClasses = {
        inputErrorClass: validationParams.inputErrorClass,
        errorClass: validationParams.errorClass
    }

    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', function () {
            toggleInputError({formElement, inputElement, errorClasses});
            toggleButtonState({inputList, buttonElement, inactiveButtonClass});
        });
    });
}

/**
 * Включает валидацию для всех форм.
 *
 * @param {Object} validationParams - Объект с параметрами валидации.
 */
function enableValidation(validationParams) {
    const formList = Array.from(document.querySelectorAll(validationParams.formSelector));

    formList.forEach((formElement) => {
        setEventListeners({formElement, validationParams});
    });
}

/**
 * Очищает состояние валидации для указанной формы.
 *
 * @param {HTMLElement} formElement - Форма, для которой необходимо очистить валидацию.
 * @param {Object} validationParams - Объект с параметрами валидации.
 */
function clearValidation(formElement, validationParams) {
    const inputList = Array.from(formElement.querySelectorAll(validationParams.inputSelector));
    const buttonElement = formElement.querySelector(validationParams.submitButtonSelector);
    const inactiveButtonClass = validationParams.inactiveButtonClass;
    const errorClasses = {
        inputErrorClass: validationParams.inputErrorClass,
        errorClass: validationParams.errorClass
    }


    inputList.forEach(inputElement => hideInputError({formElement, inputElement, errorClasses}));
    toggleButtonState({inputList, buttonElement, inactiveButtonClass});
}

export {enableValidation, clearValidation}