import '../pages/index.css';
import {createCard} from "./card/card";
import {openModal, closeModal} from "./modal/modal";
import {enableValidation, clearValidation} from "./validation/validation";
import {
    getCurrentUser,
    getCards,
    addCard,
    addLike,
    updateCurrentUser,
    updateAvatar,
    deleteCard,
    deleteLike
} from "./api/api"

import {MODAL_CLASS} from "./modal/modalConstants";
import {ELEMENT_INSERT_POSITION, UI_TEXTS} from "./commonConstants";

const placesList = document.querySelector('.places__list');
const cardTemplate = document.querySelector('#card-template').content.children[0];

const profileImage = document.querySelector('.profile__image');
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');

const buttonEditProfile = document.querySelector('.profile__edit-button');
const buttonAdd = document.querySelector('.profile__add-button');

const modalUpdateAvatar = document.querySelector('.popup_type_update-avatar');
const modalEditProfile = document.querySelector('.popup_type_edit');
const modalNewCard = document.querySelector('.popup_type_new-card');
const modalConfirmDeleteCard = document.querySelector('.popup_type_confirm-delete-card');
const modalImage = document.querySelector('.popup_type_image');
const allModalWindows = document.querySelectorAll('.popup');

const imageModal = modalImage.querySelector('.popup__image');
const captionModal = modalImage.querySelector('.popup__caption');

const formUpdateAvatar = document.forms['update-avatar'];
const formEditProfile = document.forms['edit-profile'];
const formNewCard = document.forms['new-place'];
const formConfirmDeleteCard = document.forms['confirm-delete-card'];

const cardToDelete = {
    id: null,
    element: null
};

const cardClasses = {
    image: "card__image",
    title: "card__title",
    deleteButton: "card__delete-button",
    likeButton: "card__like-button",
    likeButtonIsActive: "card__like-button_is-active",
    likeCounter: "card__like-counter"
}

const validationParams = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__input-error_visible'
}

function insertElement(targetElement, cardElement, insertPosition = 'end') {
    if (insertPosition === 'start') {
        targetElement.prepend(cardElement);
    } else {
        targetElement.append(cardElement);
    }
}

function renderUserProfile(userData) {
    profileImage.style.backgroundImage = `url(${userData.avatar})`;
    profileTitle.textContent = userData.name;
    profileDescription.textContent = userData.about;
}

function renderImageModal(imageData) {
    imageModal.src = imageData.link;
    imageModal.alt = imageData.name;
    captionModal.textContent = imageData.name;

    openModal(modalImage);
}

function renderConfirmDeleteCardModal(cardId, cardElement) {
    cardToDelete.id = cardId;
    cardToDelete.element = cardElement;
    openModal(modalConfirmDeleteCard);
}

function renderCard(cardData, insertPosition, currentUserId) {
    const cardParams = {
        cardData,
        cardTemplate,
        cardClasses,
        currentUserId,
        onClick: renderImageModal,
        onAddLike: addLike,
        onDeleteLike: deleteLike,
        onDelete: renderConfirmDeleteCardModal
    }
    const cardElement = createCard(cardParams);

    insertElement(placesList, cardElement, insertPosition);
}

function handleUpdateAvatarFormSubmit(evt) {
    evt.preventDefault();

    const form = evt.target;
    const saveButton = evt.submitter;
    const saveButtonOriginalText = saveButton.textContent;
    const avatarLink = form['link'].value;

    saveButton.textContent = UI_TEXTS.SAVE_IN_PROGRESS;

    updateAvatar(avatarLink).then(res => {
        profileImage.style.backgroundImage = `url(${res.avatar})`;
        closeModal(modalUpdateAvatar);
        form.reset();
    }).catch(err => {
        console.log(err)
    }).finally(() => {
        saveButton.textContent = saveButtonOriginalText;
    });
}

function handleProfileFormSubmit(evt) {
    evt.preventDefault();

    const form = evt.target;
    const saveButton = evt.submitter;
    const saveButtonOriginalText = saveButton.textContent;
    const userData = {
        name: form.name.value,
        about: form.description.value
    }

    saveButton.textContent = UI_TEXTS.SAVE_IN_PROGRESS;

    updateCurrentUser(userData).then(res => {
        profileTitle.textContent = res.name;
        profileDescription.textContent = res.about;
        closeModal(modalEditProfile);
    }).catch(err => {
        console.log(err)
    }).finally(() => {
        saveButton.textContent = saveButtonOriginalText;
    });
}

function handleNewCardFormSubmit(evt) {
    evt.preventDefault();

    const form = evt.target;
    const saveButton = evt.submitter;
    const saveButtonOriginalText = saveButton.textContent;
    const cardData = {
        name: form['place-name'].value,
        link: form['link'].value
    }

    saveButton.textContent = UI_TEXTS.SAVE_IN_PROGRESS;

    addCard(cardData).then(res => {
        renderCard(res, ELEMENT_INSERT_POSITION.START, res.owner._id);
        closeModal(modalNewCard);
        form.reset();
    }).catch(err => {
        console.log(err)
    }).finally(() => {
        saveButton.textContent = saveButtonOriginalText;
    });

}

function handleConfirmDeleteCardFormSubmit(evt) {
    evt.preventDefault();

    const button = evt.submitter;
    const buttonOriginalText = button.textContent;

    button.textContent = UI_TEXTS.DELETE_IN_PROGRESS;

    deleteCard(cardToDelete.id).then(res => {
        cardToDelete.element.remove();
        closeModal(modalConfirmDeleteCard);
    }).catch(err => {
        console.log(err)
    }).finally(() => {
        button.textContent = buttonOriginalText;
    });

}

function initializeCards(cards, currentUserId) {
    cards.map(cardData => renderCard(cardData, ELEMENT_INSERT_POSITION.END, currentUserId));
}

Promise.all([getCurrentUser(), getCards()])
    .then(([currentUserData, cardsData]) => {
        renderUserProfile(currentUserData);
        initializeCards(cardsData, currentUserData._id);
    }).catch(err => {
    console.log(err)
});

enableValidation(validationParams);

profileImage.addEventListener('click', () => {
    clearValidation(formUpdateAvatar, validationParams);
    openModal(modalUpdateAvatar);
});
buttonEditProfile.addEventListener('click', () => {
    formEditProfile.elements['name'].value = profileTitle.textContent;
    formEditProfile.elements['description'].value = profileDescription.textContent;

    clearValidation(formEditProfile, validationParams);
    openModal(modalEditProfile);
});
buttonAdd.addEventListener('click', () => {
    clearValidation(formNewCard, validationParams);
    openModal(modalNewCard);
});


formUpdateAvatar.addEventListener('submit', handleUpdateAvatarFormSubmit);
formEditProfile.addEventListener('submit', handleProfileFormSubmit);
formNewCard.addEventListener('submit', handleNewCardFormSubmit);
formConfirmDeleteCard.addEventListener('submit', handleConfirmDeleteCardFormSubmit);

allModalWindows.forEach((modal) => {
    modal.addEventListener('click', function (evt) {
        const isClickOnCloseButton = evt.target.classList.contains(MODAL_CLASS.CLOSE_BUTTON);

        if (isClickOnCloseButton) {
            closeModal(modal);
        }
    });

    modal.addEventListener('mousedown', function (evt) {
        const isClickOnOverlay = evt.target === this;

        if (isClickOnOverlay) {
            closeModal(modal);
        }
    });
});