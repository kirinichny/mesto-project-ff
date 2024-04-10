import '../pages/index.css';
import {initialCards} from "./card-data";
import {INSERT_POSITION, createCard, insertCard} from "./card";
import {openModal, closeModal, setImageModalData} from "./modal";

const placesList = document.querySelector('.places__list');
const cardTemplate = document.querySelector('#card-template').content.children[0];

const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');

const editProfileButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');

const editProfileModal = document.querySelector('.popup_type_edit');
const newCardModal = document.querySelector('.popup_type_new-card');
const imageModal = document.querySelector('.popup_type_image');
const allModalWindows = document.querySelectorAll('.popup');

const editProfileForm = document.forms['edit-profile'];
const newCardForm = document.forms['new-place'];

const modalClasses = {
    isOpened: "popup_is-opened",
    closeButton: "popup__close"
};
const imageModalClasses = {
    image: 'popup__image',
    caption: 'popup__caption'
};
const cardClasses = {
    image: "card__image",
    title: "card__title",
    deleteButton: "card__delete-button",
    likeButton: "card__like-button",
    likeButtonIsActive: "card__like-button_is-active"
}

function renderImageModal(imageData) {
    setImageModalData(imageModal, imageData, imageModalClasses)
    openModal(imageModal, modalClasses.isOpened);
}

function renderCard(cardData, insertPosition) {
    const cardParams = {cardData, cardTemplate, cardClasses, onClick: renderImageModal}
    const cardElement = createCard(cardParams);

    insertCard(placesList, cardElement, insertPosition);
}

function setProfileFormFields(editProfileForm, profileTitle, profileDescription) {
    editProfileForm.elements['name'].value = profileTitle;
    editProfileForm.elements['description'].value = profileDescription;
}

function handleProfileFormSubmit(evt, profileTitleElement, profileDescriptionElement) {
    evt.preventDefault();

    const form = evt.target;
    const newTitle = form.name.value;
    const newDescription = form.description.value;

    profileTitleElement.textContent = newTitle;
    profileDescriptionElement.textContent = newDescription;

    closeModal(editProfileModal, modalClasses.isOpened);
}

function handleNewCardFormSubmit(evt) {
    evt.preventDefault();

    const form = evt.target;
    const cardData = {name: form['place-name'].value, link: form['link'].value}

    renderCard(cardData, INSERT_POSITION.START);
    closeModal(newCardModal, modalClasses.isOpened);
    form.reset();
}

function initializeCards(cards) {
    cards.forEach(cardData => {
        renderCard(cardData, INSERT_POSITION.END);
    });
}

initializeCards(initialCards);
addButton.addEventListener('click', () => {
    openModal(newCardModal, modalClasses.isOpened);
});

editProfileButton.addEventListener('click', () => {
    setProfileFormFields(editProfileForm, profileTitle.textContent, profileDescription.textContent);
    openModal(editProfileModal, modalClasses.isOpened);
});

editProfileForm.addEventListener('submit', (evt) => {
    handleProfileFormSubmit(evt, profileTitle, profileDescription);
});

newCardForm.addEventListener('submit', handleNewCardFormSubmit);

allModalWindows.forEach((modal) => {
    modal.addEventListener('click', function (evt) {
        const isClickOnCloseButton = evt.target.classList.contains(modalClasses.closeButton);
        const isClickOnOverlay = evt.target === this;

        if (isClickOnCloseButton || isClickOnOverlay) {
            closeModal(modal, modalClasses.isOpened);
        }
    });
});