import '../pages/index.css';
import {initialCards} from "./card-data";
import {createCard} from "./card/card";
import {openModal, closeModal} from "./modal/modal";
import {MODAL_CLASS} from "./modal/modalConstants";
import {ELEMENT_INSERT_POSITION} from "./commonConstants";

const placesList = document.querySelector('.places__list');
const cardTemplate = document.querySelector('#card-template').content.children[0];

const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');

const buttonEditProfile = document.querySelector('.profile__edit-button');
const buttonAdd = document.querySelector('.profile__add-button');

const modalEditProfile = document.querySelector('.popup_type_edit');
const modalNewCard = document.querySelector('.popup_type_new-card');
const modalImage = document.querySelector('.popup_type_image');
const allModalWindows = document.querySelectorAll('.popup');

const imageModal = modalImage.querySelector('.popup__image');
const captionModal = modalImage.querySelector('.popup__caption');

const formEditProfile = document.forms['edit-profile'];
const formNewCard = document.forms['new-place'];

const cardClasses = {
    image: "card__image",
    title: "card__title",
    deleteButton: "card__delete-button",
    likeButton: "card__like-button",
    likeButtonIsActive: "card__like-button_is-active"
}

function insertElement(targetElement, cardElement, insertPosition = 'end') {
    if (insertPosition === 'start') {
        targetElement.prepend(cardElement);
    } else {
        targetElement.append(cardElement);
    }
}

function setModalImageData(imageData) {
    imageModal.src = imageData.link;
    imageModal.alt = imageData.name;
    captionModal.textContent = imageData.name;
}

function renderImageModal(imageData) {
    setModalImageData(modalImage, imageData);
    openModal(modalImage);
}

function renderCard(cardData, insertPosition) {
    const cardParams = {cardData, cardTemplate, cardClasses, onClick: renderImageModal}
    const cardElement = createCard(cardParams);

    insertElement(placesList, cardElement, insertPosition);
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

    closeModal(modalEditProfile);
}

function handleNewCardFormSubmit(evt) {
    evt.preventDefault();

    const form = evt.target;
    const cardData = {name: form['place-name'].value, link: form['link'].value}

    renderCard(cardData, ELEMENT_INSERT_POSITION.START);
    closeModal(modalNewCard);
    form.reset();
}

function initializeCards(cards) {
    cards.forEach(cardData => {
        renderCard(cardData, ELEMENT_INSERT_POSITION.END);
    });
}

initializeCards(initialCards);
buttonAdd.addEventListener('click', () => {
    openModal(modalNewCard);
});

buttonEditProfile.addEventListener('click', () => {
    setProfileFormFields(formEditProfile, profileTitle.textContent, profileDescription.textContent);
    openModal(modalEditProfile);
});

formEditProfile.addEventListener('submit', (evt) => {
    handleProfileFormSubmit(evt, profileTitle, profileDescription);
});

formNewCard.addEventListener('submit', handleNewCardFormSubmit);

allModalWindows.forEach((modal) => {
    modal.addEventListener('click', function (evt) {
        const isClickOnCloseButton = evt.target.classList.contains(MODAL_CLASS.CLOSE_BUTTON);
        const isClickOnOverlay = evt.target === this;

        if (isClickOnCloseButton || isClickOnOverlay) {
            closeModal(modal);
        }
    });
});