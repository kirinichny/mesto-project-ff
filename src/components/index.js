import '../pages/index.css';
import {initialCards} from "./card-data";
import {createCard} from "./card";

const placesList = document.querySelector('.places__list');
const cardTemplate = document.querySelector('#card-template').content.children[0];
const cardSelectors = {
    image: ".card__image",
    title: ".card__title",
    deleteButton: ".card__delete-button",
    likeButton: ".card__like-button",
    likeButtonIsActive: "card__like-button_is-active"
}

function renderCards(cards) {
    cards.forEach(cardData => {
        const cardElement = createCard({cardTemplate, cardData, cardSelectors});
        placesList.append(cardElement);
    });
}

renderCards(initialCards);